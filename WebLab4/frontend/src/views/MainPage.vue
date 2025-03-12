<template>
  <div class="container">
    <div class="header">
      <h1>Hello, {{ username }}!</h1>
      <button class="logout-button" @click="handleLogout">Logout</button>
    </div>

    <div class="main-content">
      <div class="graph-section">
        <svg id="coordinatePlane" width="500" height="500" @click="onSvgClick"></svg>
      </div>

      <div class="controls-section">
        <div class="input-group">
          <div class="input-field">
            <label>X Coordinate</label>
            <div class="radio-group">
              <label v-for="x in [-3, -2, -1, 0, 1, 2, 3, 4, 5]" :key="x">
                <input
                    type="radio"
                    v-model="xInput"
                    :value="x"
                />
                {{ x }}
              </label>
            </div>
          </div>

          <div class="input-field">
            <label>Y Coordinate</label>
            <input
                type="number"
                v-model="yInput"
                placeholder="-3 to 5"
                min="-3"
                max="5"
                step="any"
            />
          </div>

          <div class="input-field">
            <label>Radius R</label>
            <div class="radio-group">
              <label v-for="r in [1, 2, 3, 4, 5]" :key="r">
                <input
                    type="radio"
                    v-model="rInput"
                    :value="r"
                />
                {{ r }}
              </label>
            </div>
          </div>
        </div>

        <div class="button-group">
          <button class="btn redraw" @click="validateAndRedraw">Redraw</button>
          <button class="btn submit" @click="sendPointButton">Check Point</button>
          <button class="btn clear" @click="clearAllPoints">Clear All</button>
        </div>

        <div v-if="errorMessage" class="error-message">
          ⚠️ {{ errorMessage }}
        </div>
      </div>
    </div>

    <div class="results-section">
      <h2>Results History</h2>
      <div class="table-container">
        <table>
          <thead>
          <tr>
            <th>X</th>
            <th>Y</th>
            <th>R</th>
            <th>Result</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="point in points" :key="point.id">
            <td>{{ point.x }}</td>
            <td>{{ point.y }}</td>
            <td>{{ point.r }}</td>
            <td :class="point.hit ? 'hit-yes' : 'hit-no'">
              {{ point.hit ? 'Hit' : 'Miss' }}
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { redrawCoordinatePlane, drawPoint } from "../js/CoordinatePlane";

export default {
  data() {
    return {
      xInput: null,
      yInput: '',
      rInput: null,
      points: [],
      rValue: 1,
      errorMessage: '',
    };
  },

  mounted() {
    redrawCoordinatePlane();
    this.fetchPoints();
  },

  computed: {
    username() {
      return localStorage.getItem('username') || 'Guest';
    }
  },

  methods: {
    async onSvgClick(event) {
      const svg = document.getElementById("coordinatePlane");
      const pt = svg.createSVGPoint();
      pt.x = event.clientX;
      pt.y = event.clientY;

      const cursorPoint = pt.matrixTransform(svg.getScreenCTM().inverse());

      const x = (cursorPoint.x - 250) / 50;
      const y = -(cursorPoint.y - 250) / 50;

      console.log(x, " ", y)
      console.log(this.rValue);

      await this.sendPointToServer(x * this.rValue, y * this.rValue);
    },

    async sendPointToServer(x, y) {
      try {
        this.errorMessage = "";
        const response = await fetch("http://localhost:55321/backend-1.0-SNAPSHOT/api/check-point", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({
            x: Number(x.toFixed(2)),
            y: Number(y.toFixed(2)),
            r: this.rValue,
            username: localStorage.getItem('username'),
          })
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        this.points.unshift({
          id: this.points.length + 1,
          x: result.x.toFixed(2),
          y: result.y.toFixed(2),
          r: this.rValue,
          hit: result.hit,
        });

        drawPoint(
            result.x / (this.rValue * this.rValue),
            result.y / (this.rValue * this.rValue),
            result.hit ? "green" : "red",
            this.rValue
        );
      } catch (error) {
        this.errorMessage = "Ошибка отправки данных на сервер. Проверьте соединение.";
        console.error('Error:', error);
      }
    },

    async sendPointButton() {
      if (!this.validateInputs()) return;

      const x = parseFloat(this.xInput);
      const y = parseFloat(this.yInput);

      await this.sendPointToServer(x, y);
    },

    async clearAllPoints() {
      try {
        const response = await fetch("http://localhost:55321/backend-1.0-SNAPSHOT/api/clear-points", {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        this.points = [];
        redrawCoordinatePlane(this.rValue);
        this.errorMessage = '';
      } catch (error) {
        this.errorMessage = "Ошибка очистки точек. Проверьте соединение с сервером.";
        console.error('Error:', error);
      }
    },

    async fetchPoints() {
      try {
        const response = await fetch("http://localhost:55321/backend-1.0-SNAPSHOT/api/points", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({
            username: localStorage.getItem('username'),
          })
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();
        this.points = data.map(point => ({
          x: point.x,
          y: point.y,
          r: point.r,
          hit: point.hit,
        }));

        this.rescalePoints();
      } catch (error) {
        console.error('Error fetching points:', error);
      }
    },

    validateInputs() {
      const x = parseFloat(this.xInput);
      const y = parseFloat(this.yInput);
      const r = parseFloat(this.rInput);

      if (isNaN(x) || x < -3 || x > 3) {
        this.errorMessage = "X должен быть числом в диапазоне от -3 до 3.";
        return false;
      }
      if (isNaN(y) || y < -3 || y > 5) {
        this.errorMessage = "Y должен быть числом в диапазоне от -3 до 5.";
        return false;
      }
      if (isNaN(r) || r < 1 || r > 5) {
        this.errorMessage = "R должен быть числом в диапазоне от 1 до 5.";
        return false;
      }

      this.errorMessage = '';
      this.rValue = r;
      return true;
    },

    validateAndRedraw() {
      const r = parseFloat(this.rInput);
      if (isNaN(r) || r < 1 || r > 5) {
        this.errorMessage = "R должен быть числом в диапазоне от 1 до 5.";
        return false;
      } else {
        this.errorMessage = '';
        this.rValue = r;
        redrawCoordinatePlane(this.rValue);
        this.rescalePoints();
      }
    },

    rescalePoints() {
      redrawCoordinatePlane(this.rValue);
      this.points.forEach((point) => {
        drawPoint(
            point.x / (this.rValue * this.rValue),
            point.y / (this.rValue * this.rValue),
            point.hit ? "green" : "red",
            this.rValue
        );
      });
    },

    handleLogout() {
      this.$router.push('/');
    }
  },
};
</script>

<style scoped>
.radio-group {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.radio-group label {
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
}

.radio-group input[type="radio"] {
  margin: 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f5f7fb;
  min-height: 100vh;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding: 15px 25px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

h1 {
  color: #2c3e50;
  margin: 0;
  font-size: 24px;
}

.main-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  margin-bottom: 30px;
}

.graph-section {
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.controls-section {
  background: white;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.input-group {
  display: grid;
  gap: 15px;
  margin-bottom: 25px;
}

.input-field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.input-field label {
  font-weight: 500;
  color: #4a5568;
}

.input-field input {
  padding: 12px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s ease;
}

.input-field input:focus {
  outline: none;
  border-color: #667eea;
}

.button-group {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
}

.btn {
  padding: 12px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s, opacity 0.2s;
}

.btn:hover {
  transform: translateY(-2px);
  opacity: 0.9;
}

.redraw {
  background-color: #48bb78;
  color: white;
}

.submit {
  background-color: #667eea;
  color: white;
}

.clear {
  background-color: #f56565;
  color: white;
}

.logout-button {
  padding: 10px 20px;
  background-color: #718096;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.logout-button:hover {
  background-color: #4a5568;
}

.error-message {
  margin-top: 20px;
  padding: 15px;
  background-color: #fff5f5;
  color: #c53030;
  border-radius: 8px;
  border: 1px solid #fed7d7;
}

.results-section {
  background: white;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

h2 {
  color: #2c3e50;
  margin-bottom: 20px;
}

.table-container {
  max-height: 400px;
  overflow-y: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  background-color: white;
}

th, td {
  padding: 12px;
  text-align: center;
  border-bottom: 1px solid #e2e8f0;
}

th {
  background-color: #f7fafc;
  color: #4a5568;
  font-weight: 600;
}

tr:hover {
  background-color: #f8f9fa;
}

.hit-yes {
  color: #48bb78;
  font-weight: 600;
}

.hit-no {
  color: #f56565;
  font-weight: 600;
}
</style>