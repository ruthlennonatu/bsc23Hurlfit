Index.js
========

This is the index file that Node uses to route the front end requests to the backend.
It works both ways as it also recieves data from the backend, which is being driven by
MongoDb.

----

App.get() Method
----------------
    .. js:function:: app.get(href, function(req, res){});

   :param string href: An URI to the location of the resource.
   :param req: A param that holds data upon a return from the source.
   :param res: A param that holds data when being sent to the source.
   :returns: Something.

----

App.post() Method
-----------------

   .. js:function:: app.post(href, function(req, res){
        var data = req.body
    });

   :param string href: An URI to the location of the resource.
   :param req: A param that holds data upon a return from the source.
   :param res: A param that holds data when being sent to the source.
   :param data: A param that holds data that is being taken from the res.
   :returns: Something.