/**
 * seeder.js
 * @description :: functions that seeds mock data to run the application
 */

const bcrypt = require('bcrypt');
const User = require('../model/user');
const authConstant = require('../constants/authConstant');
const Role = require('../model/role');
const ProjectRoute = require('../model/projectRoute');
const RouteRole = require('../model/routeRole');
const UserRole = require('../model/userRole');
const { replaceAll } = require('../utils/common');
const dbService = require('../utils/dbService');

/* seeds default users */
async function seedUser () {
  try {
    let userToBeInserted = {};
    userToBeInserted = {
      'password':'s3hAqRpp9FroLc1',
      'isDeleted':false,
      'email':'Lauretta.Marks0@gmail.com',
      'isActive':true,
      'userType':authConstant.USER_TYPES.User
    };
    userToBeInserted.password = await  bcrypt.hash(userToBeInserted.password, 8);
    let user = await dbService.updateOne(User, { 'email':'Lauretta.Marks0@gmail.com' }, userToBeInserted,  { upsert: true });
    userToBeInserted = {
      'password':'UVF7P0Q8W85x1hO',
      'isDeleted':false,
      'email':'Lesly.Vandervort62@yahoo.com',
      'isActive':true,
      'userType':authConstant.USER_TYPES.Admin
    };
    userToBeInserted.password = await  bcrypt.hash(userToBeInserted.password, 8);
    let admin = await dbService.updateOne(User, { 'email':'Lesly.Vandervort62@yahoo.com' }, userToBeInserted,  { upsert: true });
    console.info('Users seeded 🍺');
  } catch (error){
    console.log('User seeder failed due to ', error.message);
  }
}
/* seeds roles */
async function seedRole () {
  try {
    const roles = [ 'User', 'Admin', 'System_User' ];
    const insertedRoles = await dbService.findMany(Role, { code: { '$in': roles.map(role => role.toUpperCase()) } });
    const rolesToInsert = [];
    roles.forEach(role => {
      if (!insertedRoles.find(insertedRole => insertedRole.code === role.toUpperCase())) {
        rolesToInsert.push({
          name: role,
          code: role.toUpperCase(),
          weight: 1
        });
      }
    });
    if (rolesToInsert.length) {
      const result = await dbService.create(Role, rolesToInsert);
      if (result) console.log('Role seeded 🍺');
      else console.log('Role seeder failed!');
    } else {
      console.log('Role is upto date 🍺');
    }
  } catch (error) {
    console.log('Role seeder failed due to ', error.message);
  }
}

/* seeds routes of project */
async function seedProjectRoutes (routes) {
  try {
    if (routes  && routes.length) {
      let routeName = '';
      const dbRoutes = await dbService.findMany(ProjectRoute, {});
      let routeArr = [];
      let routeObj = {};
      routes.forEach(route => {
        routeName = `${replaceAll((route.path).toLowerCase(), '/', '_')}`;
        route.methods.forEach(method => {
          routeObj = dbRoutes.find(dbRoute => dbRoute.route_name === routeName && dbRoute.method === method);
          if (!routeObj) {
            routeArr.push({
              'uri': route.path.toLowerCase(),
              'method': method,
              'route_name': routeName,
            });
          }
        });
      });
      if (routeArr.length) {
        const result = await dbService.create(ProjectRoute, routeArr);
        if (result) console.info('ProjectRoute model seeded 🍺');
        else console.info('ProjectRoute seeder failed.');
      } else {
        console.info('ProjectRoute is upto date 🍺');
      }
    }
  } catch (error) {
    console.log('ProjectRoute seeder failed due to ', error.message);
  }
}

/* seeds role for routes */
async function seedRouteRole () {
  try {
    const routeRoles = [ 
      {
        route: '/admin/order/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/order/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/order/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/order/addbulk',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/order/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/order/addbulk',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/order/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/order/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/order/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/order/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/admin/order/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/order/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/order/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/order/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/order/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/order/update/:id',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/order/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/order/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/order/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/order/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/order/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/order/updatebulk',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/order/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/order/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/order/softdelete/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/order/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/order/softdeletemany',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/order/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/order/delete/:id',
        role: 'Admin',
        method: 'DELETE' 
      },
      {
        route: '/admin/order/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/order/deletemany',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/order/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/user/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/user/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/user/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/user/addbulk',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/user/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/user/addbulk',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/user/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/user/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/user/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/user/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/admin/user/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/user/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/user/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/user/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/user/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/user/update/:id',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/user/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/user/update/:id',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/user/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/user/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/user/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/user/updatebulk',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/user/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/user/updatebulk',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/user/softdelete/:id',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/user/softdelete/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/user/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/user/softdeletemany',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/user/softdeletemany',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/user/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/user/delete/:id',
        role: 'User',
        method: 'DELETE' 
      },
      {
        route: '/admin/user/delete/:id',
        role: 'Admin',
        method: 'DELETE' 
      },
      {
        route: '/admin/user/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/user/deletemany',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/user/deletemany',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/user/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/master/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/master/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/master/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/master/addbulk',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/master/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/master/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/master/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/master/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/master/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/master/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/master/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/master/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/master/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/master/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/master/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/master/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/master/softdelete/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/master/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/master/softdeletemany',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/master/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/master/delete/:id',
        role: 'Admin',
        method: 'DELETE' 
      },
      {
        route: '/admin/master/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/master/deletemany',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/master/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/pushnotification/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/pushnotification/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/pushnotification/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/pushnotification/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/pushnotification/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/pushnotification/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/pushnotification/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/pushnotification/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/pushnotification/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/pushnotification/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/pushnotification/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/pushnotification/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/usertokens/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/usertokens/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/usertokens/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/usertokens/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/usertokens/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/usertokens/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/usertokens/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/usertokens/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/usertokens/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/usertokens/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/usertokens/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/usertokens/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/activitylog/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/activitylog/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/activitylog/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/activitylog/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/activitylog/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/activitylog/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/activitylog/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/activitylog/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/activitylog/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/activitylog/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/activitylog/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/activitylog/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/role/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/role/addbulk',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/role/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/role/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/role/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/role/update/:id',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/role/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/role/updatebulk',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/role/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/role/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/role/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/role/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/projectroute/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/projectroute/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/projectroute/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/projectroute/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/projectroute/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/projectroute/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/projectroute/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/projectroute/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/projectroute/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/projectroute/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/projectroute/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/projectroute/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/routerole/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/routerole/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/routerole/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/routerole/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/routerole/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/routerole/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/routerole/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/routerole/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/routerole/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/routerole/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/routerole/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/routerole/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/userrole/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/userrole/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/userrole/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/userrole/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/userrole/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/userrole/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userrole/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userrole/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userrole/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userrole/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userrole/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/userrole/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/order/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/order/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/order/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/order/addbulk',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/order/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/order/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/order/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/order/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/order/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/order/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/order/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/order/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/order/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/order/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/order/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/order/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/order/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/order/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/order/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/order/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/order/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/order/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/order/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/order/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/order/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/order/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/order/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/order/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/order/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/order/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/order/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/order/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/addbulk',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/user/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/user/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/user/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/softdelete/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/softdeletemany',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/delete/:id',
        role: 'User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/user/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/user/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/user/deletemany',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/master/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/master/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/master/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/master/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/master/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/master/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/master/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/master/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/master/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/master/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/master/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/master/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/master/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/master/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/master/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/master/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/master/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/master/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/master/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/master/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/master/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/master/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/master/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/master/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/pushnotification/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/pushnotification/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/pushnotification/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/pushnotification/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/pushnotification/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/pushnotification/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/pushnotification/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/pushnotification/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/pushnotification/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/pushnotification/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/pushnotification/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/pushnotification/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/usertokens/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/usertokens/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/usertokens/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/usertokens/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/usertokens/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/usertokens/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/usertokens/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/usertokens/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/usertokens/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/usertokens/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/usertokens/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/usertokens/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/activitylog/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/activitylog/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/activitylog/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/activitylog/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/activitylog/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/activitylog/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/activitylog/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/activitylog/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/activitylog/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/activitylog/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/activitylog/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/activitylog/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/role/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/role/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/role/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/role/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/role/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/role/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/role/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/role/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/role/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/role/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/role/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/role/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/projectroute/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/projectroute/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/projectroute/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/projectroute/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/projectroute/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/projectroute/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/projectroute/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/projectroute/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/projectroute/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/projectroute/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/projectroute/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/projectroute/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/routerole/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/routerole/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/routerole/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/routerole/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/routerole/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/routerole/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/routerole/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/routerole/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/routerole/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/routerole/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/routerole/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/routerole/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userrole/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userrole/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userrole/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userrole/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/userrole/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userrole/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userrole/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userrole/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userrole/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userrole/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userrole/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/userrole/deletemany',
        role: 'System_User',
        method: 'POST'
      },

    ];
    if (routeRoles && routeRoles.length) {
      const routes = [...new Set(routeRoles.map(routeRole => routeRole.route.toLowerCase()))];
      const routeMethods = [...new Set(routeRoles.map(routeRole => routeRole.method))];
      const roles = [ 'User', 'Admin', 'System_User' ];
      const insertedProjectRoute = await dbService.findMany(ProjectRoute, {
        uri: { '$in': routes },
        method: { '$in': routeMethods },
        'isActive': true,
        'isDeleted': false
      });
      const insertedRoles = await dbService.findMany(Role, {
        code: { '$in': roles.map(role => role.toUpperCase()) },
        'isActive': true,
        'isDeleted': false
      });
      let projectRouteId = '';
      let roleId = '';
      let createRouteRoles = routeRoles.map(routeRole => {
        projectRouteId = insertedProjectRoute.find(pr => pr.uri === routeRole.route.toLowerCase() && pr.method === routeRole.method);
        roleId = insertedRoles.find(r => r.code === routeRole.role.toUpperCase());
        if (projectRouteId && roleId) {
          return {
            roleId: roleId.id,
            routeId: projectRouteId.id
          };
        }
      });
      createRouteRoles = createRouteRoles.filter(Boolean);
      const routeRolesToBeInserted = [];
      let routeRoleObj = {};

      await Promise.all(
        createRouteRoles.map(async routeRole => {
          routeRoleObj = await dbService.findOne(RouteRole, {
            routeId: routeRole.routeId,
            roleId: routeRole.roleId,
          });
          if (!routeRoleObj) {
            routeRolesToBeInserted.push({
              routeId: routeRole.routeId,
              roleId: routeRole.roleId,
            });
          }
        })
      );
      if (routeRolesToBeInserted.length) {
        const result = await dbService.create(RouteRole, routeRolesToBeInserted);
        if (result) console.log('RouteRole seeded 🍺');
        else console.log('RouteRole seeder failed!');
      } else {
        console.log('RouteRole is upto date 🍺');
      }
    }
  } catch (error){
    console.log('RouteRole seeder failed due to ', error.message);
  }
}

/* seeds roles for users */
async function seedUserRole (){
  try {
    const userRoles = [{
      'email':'Lauretta.Marks0@gmail.com',
      'password':'s3hAqRpp9FroLc1'
    },{
      'email':'Lesly.Vandervort62@yahoo.com',
      'password':'UVF7P0Q8W85x1hO'
    }];
    const defaultRoles = await dbService.findMany(Role);
    const insertedUsers = await dbService.findMany(User, { username: { '$in': userRoles.map(userRole => userRole.username) } });
    let user = {};
    const userRolesArr = [];
    userRoles.map(userRole => {
      user = insertedUsers.find(user => user.username === userRole.username && user.isPasswordMatch(userRole.password) && user.isActive && !user.isDeleted);
      if (user) {
        if (user.userType === authConstant.USER_TYPES.Admin){
          userRolesArr.push({
            userId: user.id,
            roleId: defaultRoles.find((d)=>d.code === 'ADMIN')._id
          });
        } else if (user.userType === authConstant.USER_TYPES.User){
          userRolesArr.push({
            userId: user.id,
            roleId: defaultRoles.find((d)=>d.code === 'USER')._id
          });
        } else {
          userRolesArr.push({
            userId: user.id,
            roleId: defaultRoles.find((d)=>d.code === 'SYSTEM_USER')._id
          });
        }  
      }
    });
    let userRoleObj = {};
    const userRolesToBeInserted = [];
    if (userRolesArr.length) {
      await Promise.all(
        userRolesArr.map(async userRole => {
          userRoleObj = await dbService.findOne(UserRole, {
            userId: userRole.userId,
            roleId: userRole.roleId
          });
          if (!userRoleObj) {
            userRolesToBeInserted.push({
              userId: userRole.userId,
              roleId: userRole.roleId
            });
          }
        })
      );
      if (userRolesToBeInserted.length) {
        const result = await dbService.create(UserRole, userRolesToBeInserted);
        if (result) console.log('UserRole seeded 🍺');
        else console.log('UserRole seeder failed');
      } else {
        console.log('UserRole is upto date 🍺');
      }
    }
  } catch (error) {
    console.log('UserRole seeder failed due to ', error.message);
  }
}

async function seedData (allRegisterRoutes){
  await seedUser();
  await seedRole();
  await seedProjectRoutes(allRegisterRoutes);
  await seedRouteRole();
  await seedUserRole();

};
module.exports = seedData;