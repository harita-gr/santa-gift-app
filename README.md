# 🎅 Santa Gift APP

<img width="541" alt="image" src="https://github.com/harita-gr/santa-gift-app/assets/61909695/0370d688-4ce0-4480-9243-57bce0dc9cf7">

---
### Built Using
FE
- React.js
- CSS
- Axios
  
BE
- Express.js
- Nodemailer
- Node-Cron
  
Deploy
- Render
---
### Objectives
The webapp should display a form for children to enter their id and a free text message to santa.

When submitting the form, the server should check:

that the child is registered
that the child is less than 10 years old. To this purpose, the server can fetch user and profiles data in JSON format from:
https://raw.githubusercontent.com/alj-devops/santa-data/master/userProfiles.json
https://raw.githubusercontent.com/alj-devops/santa-data/master/users.json
If the child is not registered (no match for the user id) or more than 10years old, the webapp should display a basic error page with an error message explaining the problem.
If the child is registered and less than 10 years old, the server should show a page indicating that the request has been received.

Every 15seconds, the server should send an email with information on all pending (not yet sent) requests including:

child username (eg. charlie.brown)
child's address (eg. 219-1130, Ikanikeisaiganaibaai, Musashino-shi, Tokyo)
request free text as was input in the form
Email sender should be set as do_not_reply@northpole.com, and sent to santa@northpole.com

---
### Hosted at
[https://santa-gift-app.onrender.com](https://santa-gift-app.onrender.com)

---
### Author
Harita Ravindranath




