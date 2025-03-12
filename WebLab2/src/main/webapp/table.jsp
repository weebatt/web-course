<%@ page import="java.util.List" %>
<%@ page import="java.util.List" %>
<%@ page import="org.example.weblab2.Point" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Таблица</title>
    <link rel="stylesheet" type="text/css" href="mystyle.css">
</head>
<body>
<h2>История точек</h2>
<table id="output-table" border="1">
    <tr>
        <th>#</th>
        <th>X</th>
        <th>Y</th>
        <th>R</th>
        <th>Попадание</th>
        <th>Время</th>
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
        <td><%= new java.util.Date() %></td>
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
</table>
<div id="goBack">
    <a href="index.jsp">Вернуться к форме</a>
</div>
</body>
</html>


<%--<%@ page contentType="text/html;charset=UTF-8" language="java" %>--%>
<%--<html>--%>
<%--<head>--%>
<%--  <title>Points Table</title>--%>
<%--</head>--%>
<%--<body>--%>
<%--<h2>Points List</h2>--%>
<%--<table border="1">--%>
<%--  <tr>--%>
<%--    <th>X</th>--%>
<%--    <th>Y</th>--%>
<%--    <th>Radius</th>--%>
<%--    <th>Hit</th>--%>
<%--  </tr>--%>
<%--  <c:forEach var="point" items="${points}">--%>
<%--    <tr>--%>
<%--      <td>${point.x}</td>--%>
<%--      <td>${point.y}</td>--%>
<%--      <td>${point.radius}</td>--%>
<%--      <td>${point.hitCheck}</td>--%>
<%--    </tr>--%>
<%--  </c:forEach>--%>
<%--</table>--%>
<%--</body>--%>
<%--</html>--%>