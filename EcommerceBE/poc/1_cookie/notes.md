 **HTTP packet**
* Header : metadata about the packet
* Body : actual payload
* cookies -> part of header 

## cookies
* cookie is a client side storage
* It stores data in the format `key : value` pairs .These pair should be of type string
* Server sends these cookies to the client 
* on the client side these cookies are stored and mapped to the server that has send the cookies
* For next request -> client will automatically share this cookie with the server