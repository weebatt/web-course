<%@ page import="org.example.weblab2.Point" %>
<%@ page import="java.util.List" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>WebLab1</title>
    <link href="mystyle.css" rel="stylesheet" type="text/css"/>
</head>
<body>
<div id="header">
    <h1>Лабораторная работа №1</h1>
    <a>Александров Александр Александрович</a>
    <p>Группа: P3206 Вариант: 115222</p>
</div>

<form id="bottom">
    <svg id="coordinatePlane" width="400" height="400"></svg>
    <div id="buttons-container">
        <div class="x-buttons-container">
            <label class="x-label">Изменить X:</label>
            <button type="button" class="x-button" value="-2">-2</button>
            <button type="button" class="x-button" value="-1.5">-1.5</button>
            <button type="button" class="x-button" value="-1">-1</button>
            <button type="button" class="x-button" value="-0.5">-0.5</button>
            <button type="button" class="x-button" value="0">0</button>
            <button type="button" class="x-button" value="0.5" >0.5</button>
            <button type="button" class="x-button" value="1" >1</button>
            <button type="button" class="x-button" value="1.5" >1.5</button>
            <button type="button" class="x-button" value="2" >2</button>
        </div>
        <div class="y-input-container">
            <label class="y-label">Изменить Y:</label>
            <input type="text" class="y-input" name="y-coordinate" placeholder="Введите Y из (-3, 3)" >
        </div>
        <div class="radius-input-container">
            <label class="radius-label">Изменить R:</label>
            <input type="text" class="radius-input" name="radius-coordinate" placeholder="Введите R из (2, 5)" >
        </div>
        <div>
            <audio src="neProbil.mp3" id="neProbil"></audio>
            <audio src="probitie1.mp3" id="probil"></audio>
        </div>
    </div>
    <div>
    <table id="output-table" border="1">
        <tr>
            <th>#</th>
            <th>X</th>
            <th>Y</th>
            <th>R</th>
            <th>Попадание</th>
        </tr>
            <%
    List<Point> history = Point.getHistory();
    if (history != null && !history.isEmpty()) {
      int count = 1;
      for (Point point : history) {
  %>
        <tr>
            <td><%= count++ %></td>
            <td><%= point.getX() %></td>
            <td><%= point.getY() %></td>
            <td><%= point.getRadius() %></td>
            <td><%= point.isHit() ? "Да" : "Нет" %></td>
        </tr>
            <%
    }
  } else {
  %>
        <tr>
            <td colspan="6">Нет данных для отображения</td>
        </tr>
            <%
    }
  %>
    </div>
    <script src="validate.js"></script>
    <script src="coord.js"></script>
</form>
</body>
</html>
