# simple-decor
## Purpose
Modern REST API frameworks allow simple syntax to register new routes and type check their data transfer object (DTO). 
In [express](https://www.npmjs.com/package/express), these processes can be verbose, but migrating to newer frameworks is not always an option. 

The goal of simple-decor is to bring in uncomplicated decorator-based route registration and DTO type checking to Express projects. Additionally, it plans to include automatic OpenAPI documentation generation in upcoming versions.

## Installation

Using npm:
```shell
$ npm i simple-decor
```

## Usage
Register a `POST company/:companyId/user` and DTO type checking using controller decorators 
```ts
import { Post, ParamIsInt, BodyIsClass } from 'simple-decor';

class UserController {

  @Post('company/:companyId/user/:id') 
  @ParamIsInt('companyId') 
  @BodyIsClass(PostUserBody)
  post(req: Request, res: Response) {
    const {email,name} = req.body as PostUserBody;
    
    //create user ...
    
    res.send(200);
  }
  
}
```

Add registered routes to express application
```ts
import { setup } from 'simple-decor';

const app = express();
app.listen(3000);
setup(app);
```

## Decorators

#### Route registration
Decorator    | Parameters                       | Description
-------------|----------------------------------|------------
Get          | path `string`                    | Registers a new `GET` route 
Patch        | path `string`                    | Registers a new `PATCH` route
Post         | path `string`                    | Registers a new  `POST`route
Put          | path `string`                    | Registers a new `PUT` route
Delete       | path `string`                    | Registers a new  `DELETE` route


#### Path param type checking

Decorator    | Parameters                       | Description
-------------|----------------------------------|------------
ParamExists  | name:`string`                    | Throws error if http request does not contains a path parameter with given name
ParamIsInt   | name:`string`                    | Throws error if http request does not contains a path parameter with given name that contains only digits
ParamIsEmail | name:`string`                    | Throws error if http request does not contains a path parameter with given name that loosely matches an email
ParamIsEnum  | name:`string`, enum:`enum`       | Throws error if http request does not contains a path parameter with given name that is in the given enum


#### Query param type checking

Decorator    | Parameters                       | Description
-------------|----------------------------------|------------
QueryExists  | name:`string`                    | Throws error if http request does not contains a query parameter with given name
QueryIsInt   | name:`string`                    | Throws error if http request does not contains a query parameter with given name that contains only digits
QueryIsEmail | name:`string`                    | Throws error if http request does not contains a query parameter with given name that loosely matches an email
QueryIsEnum  | name:`string`, enum:`enum`       | Throws error if http request does not contains a query parameter with given name that is in the given enum


#### Body type checking
Decorator    | Parameters                       | Description
-------------|----------------------------------|------------
BodyIsClass  | bodyClass: `class`               | Throws error if http reqest body does not match the given class (class must be annotated with `class-validator` and `class-transformer` decorators
