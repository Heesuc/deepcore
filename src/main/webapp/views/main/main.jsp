
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>    
<!DOCTYPE html>

<script src="/js/common/jquery.js"></script>
<script src="/js/common/common.js"></script>
<script src="/js/main/main.js"></script>
 
<html>
<head>
<meta charset="UTF-8">
<title>mainpage</title>
<link rel="shortcut icon" href="#">
</head>

<body>
<c:forEach var="mainModel" items="${mainModelList}" varStatus="status">
    <p>${status.count} : <c:out value="${mainModel.column1}" /></p><br>
    <p>${status.count} : <c:out value="${mainModel.column2}" /></p><br>
    <p>${status.count} : <c:out value="${mainModel.column3}" /></p><br>
</c:forEach>

<form id="input_test">
    <input type="hidden" name="input1" id="input1" value="val1"/>
    <input type="hidden" name="input2" id="input2" value="val2"/>
    <input type="hidden" name="input3" id="input3" value="val3"/>
</form>

</body>
</html>				