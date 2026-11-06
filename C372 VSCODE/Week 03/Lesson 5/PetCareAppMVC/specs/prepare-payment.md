# Feature: Prepare payment details
## 1. User goal
As a pet owner, I want to review the selected service and amount before payment.
## 2. Scope
Review selected service and amount before payment
Catalogue (ID, name, numeric price):
1, Vaccination, 35
2, Pet Grooming, 50
3, Boarding, 80

Use the server catalogue price. Do not accept a client-supplied payment amount.

## 3. Request
GET /payments/prepare/:serviceId
The only input is serviceId in the URL. If the client sends an amount, it is ignored and the catalogue price is used.

## 4. Service catalogue
id, service name, price
1, Vaccination, 35
2, Pet grooming, 50
3, Boarding, 80

## 5. Successful response
HTTP 200 with exactly five JSON fields:
serviceId (number), serviceName (string), amount (number),
currency (string, "sgd"), status (string, "READY_FOR_PAYMENT").
amount equals the price of the selected service in the catalogue.

## 6. Unsuccessful response
Unknown service: HTTP 404 with {"error":"Service not found"}.

## 7. Acceptance criteria
AC1: /1 -> 200; Vaccination; amount 35; serviceId 1.
AC2: /2 -> 200; Pet Grooming; amount 50; serviceId 2.
AC3: /3 -> 200; Boarding; amount 80; serviceId 3.
AC4: /999 -> 404; the exact error object above.
AC5: Each success has exactly the five agreed fields,
correct types, catalogue values, "sgd" and "READY_FOR_PAYMENT".
Access: No login required for this classroom mock.
Out of scope: charging money, gateway integration, transactions,
new database tables, EJS pages or changes to existing features.


## 8. Open questions
What should happen if serviceId is not a number (for example /payments/prepare/abc)? Not agreed yet