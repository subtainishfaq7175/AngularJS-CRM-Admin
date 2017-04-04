1. Remove node_modules from both packages
2. Run npm install in both packages
3. Run npm intall -g bower
4. Run bower install in frontend package
5. Create Super user using Secret Method
6. POST empty validation object to avoid exception (Developer should handle this exception before production enviroment)
7. Create team Master data as 1. telesale 2. sale
8. create other master data .
9.add nodes in validation
{
  "_id": "58e162a30deee811d8d98c4e",
  "__v": 6,
  "nodes": [
    {
      "title": "leadForm",
      "name": "leadForm",
      "id": "rand",
      "isForm": true,
      "nodes": [
        {
          "isForm": false,
          "name": "leadFeild",
          "title": "leadfeild",
          "id": null
        }
      ]
    },
    {
      "title": "contactForm",
      "name": "contactForm",
      "id": "rand",
      "isForm": true,
      "nodes": [
        {
          "isForm": false,
          "name": "contactFeild",
          "title": "contactFeild",
          "id": null
        }
      ]
    },
    {
      "title": "companyForm",
      "name": "companyForm",
      "id": "rand",
      "isForm": true,
      "nodes": [
        {
          "isForm": false,
          "name": "companyFeild",
          "title": "companyFeild",
          "id": null
        }
      ]
    }
  ]
}


Above steps must be done using installer , before delivering to client