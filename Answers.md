***NOTE***
There are a few unit tests that are failing. The functions that are being tested work in the app, but not within the tests and we have absolutely no idea why (after spending waaaayyy too many hours trying to figure it out). 


1. It's totally DIFFERENT. It ignores more of a broad range of things compared to the previous one. Others appear in the root dir, server dir, client dir. There's more than one because we want different things ignored in client and server. They interact by telling GitHub to ignore specific things in the local client/server dirs.
2. There is one in root dir which allows to build the whole client/server. There is one in eah cilent and server which allows to build each of them. The reson we think is it helps when we are going to test each part.
3. The basic code for the navbar can be found in the app.component.html. There the route link is used to reference a URL reference. From there app.route.ts generates the selected page. No, SparkJava is not the only component doing routing, app.routes.ts is also doing routing.
4. user-list.service.ts is the class that accesses the localhost:4567/api/users to get the data, which will be used in this one. The reason why it is not in the user-list.component.ts is because user-list.component.ts is what populates the specific users page. By having the two separate, we can use the functionality of user-list.service.ts in another file if we want. 
