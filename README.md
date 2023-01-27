## Assignment: Graphql

### Tasks:

1. Add logic to the restful endpoints (users, posts, profiles, member-types folders in ./src/routes).  
   1.1. npm run test - 100%
2. Add logic to the graphql endpoint (graphql folder in ./src/routes).  
   Constraints and logic for gql queries should be done based on restful implementation.  
   For each subtask provide an example of POST body in the PR.  
   All dynamic values should be sent via "variables" field.  
   If the properties of the entity are not specified, then return the id of it.  
   `userSubscribedTo` - these are users that the current user is following.  
   `subscribedToUser` - these are users who are following the current user.

   - Get gql requests:  
     2.1. Get users, profiles, posts, memberTypes - 4 operations in one query.

     ```
     query ex2_1 {
       users { id firstName lastName email subscribedToUserIds }
       profiles { id userId memberTypeId avatar sex birthday country street city }
       posts { id userId title content }
       memberTypes { id discount monthPostsLimit }
     }
     ```

     2.2. Get user, profile, post, memberType by id - 4 operations in one query.

     ```
     query ex2_2 ($userId: ID!, $profileId: ID!, $postId: ID!, $memberTypeId: String!) {
       user (id: $userId) { id firstName lastName email subscribedToUserIds }
       profile (id: $profileId) { id userId memberTypeId avatar sex birthday country street city }
       post (id: $postId) { id userId title content }
       memberType (id: $memberTypeId) { id discount monthPostsLimit }
     }
     {
       "userId": "uuid",
       "profileId": "uuid",
       "postId": "uuid",
       "memberTypeId": "basic"
     }
     ```

     2.3. Get users with their posts, profiles, memberTypes.

     ```
     query ex2_3 {
       usersWithAllEntities {
         user { id firstName lastName email subscribedToUserIds }
         profile { id userId memberTypeId avatar sex birthday country street city }
         posts { id userId title content }
         memberType { id discount monthPostsLimit }
       }
     }
     ```

     2.4. Get user by id with his posts, profile, memberType.

     ```
     query ex2_4 ($userId: ID!) {
       userWithAllEntities (id: $userId) {
         user { id firstName lastName email subscribedToUserIds }
         profile { id userId memberTypeId avatar sex birthday country street city }
         posts { id userId title content }
         memberType { id discount monthPostsLimit }
       }
     }
     {
       "userId": "uuid"
     }
     ```

     2.5. Get users with their `userSubscribedTo`, profile.

     ```
     query ex2_5 {
       usersWithSubscribedToFullProfile {
         user { id firstName lastName email subscribedToUserIds }
         subscribedTo {
           user { id firstName lastName email }
           profile { id userId memberTypeId avatar sex birthday country street city }
         }
       }
     }
     ```

     or

     ```
     query ex2_5 {
       usersWithSubscribedToFullProfile {
         user { id firstName lastName email subscribedToUserIds }
         subscribedTo {
           userFullProfile {
             id firstName lastName email
             profile { id userId memberTypeId avatar sex birthday country street city }
             memberType { id discount monthPostsLimit }
           }
         }
       }
     }
     ```

     2.6. Get user by id with his `subscribedToUser`, posts.  
     2.7. Get users with their `userSubscribedTo`, `subscribedToUser` (additionally for each user in `userSubscribedTo`, `subscribedToUser` add their `userSubscribedTo`, `subscribedToUser`).

   - Create gql requests:  
     2.8. Create user.
     ```
     mutation ex2_8 ($createUserDTO: userCreateType!) {
       createUser ( createUserDTO: $createUserDTO )
         { id firstName lastName email subscribedToUserIds }
     }
     {
       "createUserDTO": {
         "firstName": "firstName1",
         "lastName": "lastName1",
         "email": "email1"
       }
     }
     ```
     2.9. Create profile.
     ```
     mutation ex2_9 ($createProfileDTO: profileCreateType!) {
       createProfile ( createProfileDTO: $createProfileDTO )
         { id userId memberTypeId avatar sex birthday country street city }
     }
     {
       "createProfileDTO": {
         "userId": "uuid",
         "memberTypeId": "basic",
         "avatar": "avatar",
         "sex": "sex",
         "birthday": 222222222,
         "country": "country",
         "street": "street",
         "city": "city"
       }
     }
     ```
     2.10. Create post.
     ```
     mutation ex2_10 ($createPostDTO: postCreateType!) {
       createPost ( createPostDTO: $createPostDTO )
         { id userId title content }
     }
     {
       "createPostDTO": {
         "userId": "uuid",
         "title": "title",
         "content": "content content content"
       }
     }
     ```
     2.11. [InputObjectType](https://graphql.org/graphql-js/type/#graphqlinputobjecttype) for DTOs.
   - Update gql requests:  
     2.12. Update user.

     ```
     mutation ex2_12 ($id:ID!, $updateUserDTO: userUpdateType!) {
       updateUser ( id: $id, updateUserDTO: $updateUserDTO )
         { id firstName lastName email subscribedToUserIds }
     }
     {
       "id": "uuid",
       "updateUserDTO": {
         "email": "email2",
       }
     }
     ```

     2.13. Update profile.

     ```
     mutation ex2_13 ($id:ID!, $updateProfileDTO: profileUpdateType!) {
       updateProfile ( id :$id, updateProfileDTO: $updateProfileDTO )
         { id userId memberTypeId avatar sex birthday country street city }
     }
     {
       "id": "uuid",
       "updateProfileDTO": {
         "country": "new country",
         "street": "new street",
         "city": "new city"
       }
     }
     ```

     2.14. Update post.

     ```
     mutation ex2_14 ($id:ID!, $updatePostDTO: postUpdateType ) {
       updatePost ( id: $id, updatePostDTO: $updatePostDTO )
         { id userId title content }
     }
     {
       "id": "uuid",
       "updatePostDTO": {
         "title": "new title"
       }
     }
     ```

     2.15. Update memberType.

     ```
     mutation ex2_15 ($id:String!, $updateMemberTypeDTO: memberTypeUpdateType!) {
       updateMemberType ( id: $id, updateMemberTypeDTO: $updateMemberTypeDTO )
         { id discount monthPostsLimit }
     }
     {
       "id": "basic",
       "updateMemberTypeDTO": {
         "discount": 3
       }
     }
     ```

     2.16. Subscribe to; unsubscribe from.

     ```
     mutation ex2_16_1 ($id:ID!, $idForSubscribe: ID!) {
       subscribeTo ( id: $id, idForSubscribe: $idForSubscribe )
         { id firstName lastName email subscribedToUserIds }
     }
     {
       "id": "uuid",
       "idForSubscribe": "uuid"
     }

     mutation ex2_16_2 ($id:ID!, $idForUnsubscribe: ID!) {
       unsubscribeFrom ( id: $id, idForUnsubscribe: $idForUnsubscribe )
         { id firstName lastName email subscribedToUserIds }
     }
     {
       "id": "uuid",
       "idForUnsubscribe": "uuid"
     }
     ```

     2.17. [InputObjectType](https://graphql.org/graphql-js/type/#graphqlinputobjecttype) for DTOs.

3. Solve `n+1` graphql problem with [dataloader](https://www.npmjs.com/package/dataloader) package in all places where it should be used.  
   You can use only one "findMany" call per loader to consider this task completed.  
   It's ok to leave the use of the dataloader even if only one entity was requested. But additionally (no extra score) you can optimize the behavior for such cases => +1 db call is allowed per loader.  
   3.1. List where the dataloader was used with links to the lines of code (creation in gql context and call in resolver).
4. Limit the complexity of the graphql queries by their depth with [graphql-depth-limit](https://www.npmjs.com/package/graphql-depth-limit) package.  
   4.1. Provide a link to the line of code where it was used.  
   4.2. Specify a POST body of gql query that ends with an error due to the operation of the rule. Request result should be with `errors` field (and with or without `data:null`) describing the error.

### Description:

All dependencies to complete this task are already installed.  
You are free to install new dependencies as long as you use them.  
App template was made with fastify, but you don't need to know much about fastify to get the tasks done.  
All templates for restful endpoints are placed, just fill in the logic for each of them.  
Use the "db" property of the "fastify" object as a database access methods ("db" is an instance of the DB class => ./src/utils/DB/DB.ts).  
Body, params have fixed structure for each restful endpoint due to jsonSchema (schema.ts files near index.ts).

### Description for the 1 task:

If the requested entity is missing - send 404 http code.  
If operation cannot be performed because of the client input - send 400 http code.  
You can use methods of "reply" to set http code or throw an [http error](https://github.com/fastify/fastify-sensible#fastifyhttperrors).  
If operation is successfully completed, then return an entity or array of entities from http handler (fastify will stringify object/array and will send it).

Relation fields are only stored in dependent/child entities. E.g. profile stores "userId" field.  
You are also responsible for verifying that the relations are real. E.g. "userId" belongs to the real user.  
So when you delete dependent entity, you automatically delete relations with its parents.  
But when you delete parent entity, you need to delete relations from child entities yourself to keep the data relevant.  
(In the next rss-school task, you will use a full-fledged database that also can automatically remove child entities when the parent is deleted, verify keys ownership and instead of arrays for storing keys, you will use additional "join" tables)

To determine that all your restful logic works correctly => run the script "npm run test".  
But be careful because these tests are integration (E.g. to test "delete" logic => it creates the entity via a "create" endpoint).

### Description for the 2 task:

You are free to create your own gql environment as long as you use predefined graphql endpoint (./src/routes/graphql/index.ts).  
(or stick to the [default code-first](https://github.dev/graphql/graphql-js/blob/ffa18e9de0ae630d7e5f264f72c94d497c70016b/src/__tests__/starWarsSchema.ts))

### Description for the 3 task:

If you have chosen a non-default gql environment, then the connection of some functionality may differ, be sure to report this in the PR.

### Description for the 4 task:

If you have chosen a non-default gql environment, then the connection of some functionality may differ, be sure to report this in the PR.  
Limit the complexity of the graphql queries by their depth with "graphql-depth-limit" package.  
E.g. User can refer to other users via properties `userSubscribedTo`, `subscribedToUser` and users within them can also have `userSubscribedTo`, `subscribedToUser` and so on.  
Your task is to add a new rule (created by "graphql-depth-limit") in [validation](https://graphql.org/graphql-js/validation/) to limit such nesting to (for example) 6 levels max.
