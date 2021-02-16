
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>    
<!DOCTYPE html>

<script type="text/javascript" src="/js/main/main.js"></script>
 
<html>
<head>
<meta charset="UTF-8">
<title>mainpage</title>
</head>
<body>

<c:forEach var="mainModel" items="${mainModelList}" varStatus="status">
    <p>${status.count} : <c:out value="${mainModel.column1}" /></p><br>
    <p>${status.count} : <c:out value="${mainModel.column2}" /></p><br>
    <p>${status.count} : <c:out value="${mainModel.column3}" /></p><br>
</c:forEach>

</body>
</html>				