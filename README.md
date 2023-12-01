# ALX Element Boilerplate

### Description

This boilerplate has been designed to help you get started to create your own elements that can be used in the ALX Catalyst application.  
The boilerplate handles getting the access token allowing API access for development on your localhost it uses the [redux-toolkit](https://redux-toolkit.js.org/rtk-query/usage/queries) to handle the api calls with some basic endpoints added.  
The boilerplate posts the messageData into the rect application from the index.html file allowing you to simulate Catalyst passing in the parameters, this is then saved into the redux store allowing access from any react component using the useAppSelector hook.  
There is a useTheme that is used to handle the basic theme colors and this mirrors the theme within Catalyst so you can copy the #colors over or use your own theme colors.

### Getting Started

The first thing I suggest doing is adding in the parameters that you will be using for the app. these will need to be added to the config.json file. These parameters will be displayed in the side panel for users to enter the data into the input fields.

```json
{
  "version": "2.0.0",
  "logo": "https://www.autologyx.com/wp-content/uploads/2020/09/favicon.png",
  "publisher": "ALX",
  "publisher_url": "https://www.autologyx.com/",
  "parameters": [
    {
      "parameter_name": "primary_color",
      "parameter_description": "Enter a hex color.",
      "parameter_type": "string"
    },
    {
      "parameter_name": "secondary_color",
      "parameter_description": "Enter a hex color.",
      "parameter_type": "string"
    },
    {
      "parameter_name": "tertiary_color",
      "parameter_description": "Enter a hex color.",
      "parameter_type": "string"
    },
    {
      "parameter_name": "nav_and_background_colors",
      "parameter_description": "Enter a hex color.",
      "parameter_type": "string"
    },
    {
      "parameter_name": "background_colors",
      "parameter_description": "Enter a hex color.",
      "parameter_type": "string"
    }
  ]
}
```

Screen shot for how the config is used to construct parameter input fields in Catalyst

![Catalyst property input fields](/img/property_fields.png)

### Table of allowed fields in the config.json

| Key Name              | is required | valid type | options                                                |
| --------------------- | ----------- | ---------- | ------------------------------------------------------ |
| version               | true        | str        |                                                        |
| parameters            | false       | object     |                                                        |
| logo                  | false       | str        |                                                        |
| publisher             | false       | str        |                                                        |
| publisher_url         | false       | str        |                                                        |
| parameter_name        | true        | str        |                                                        |
| parameter_description | false       | str        |                                                        |
| parameter_type        | true        | enum       | ("string" , "integer", "float" , "boolean", "enum")    |
| parameter_limit       | false       | int        |                                                        |
| parameter_options     | false       | list       | ["yes","No"] (used when parameter_type is set to enum) |

After the config.json has been updated with the parameters that your app will be using you then need to add these into the index.html file so that you can use them in your application for testing and development.  
The parameters will be an object where the key is the value given to the parameter_name in the config.json, the value will be what the user enters into the parameter fields when setting up the element in Catalyst.

```html
<body class="scrollbar-none">
  <div id="root" class="scrollbar-none"></div>
  <script type="module" src="/src/main.tsx"></script>
  <!-- Uncomment the below for testing with the parameters passed in to the messageData -->
  <script>
    setTimeout(() => {
      console.log("Running post message script.");
      const messageData = {
        user_details: {
          access_token: "",
          first_name: "",
          last_name: "",
          user_id: "5",
          user_name: "",
        },
        object_record_meta: {
          class_id: "464",
          record_id: "",
        },
        endpoint: "http://localhost:3001", //same port as the proxy
        component_parameters: [],
        parameters: {
          primary_color: "#5A88DB",
          secondary_color: "#7C8664",
          tertiary_color: "#DB6D5A",
          nav_and_background_colors: "#333333",
          background_color: "#DEDEDE",
        },
      };
      window.postMessage(messageData, "http://localhost:5173/");
    }, 2000);
  </script>
</body>
```

After updating the index.html I suggest adding the parameters you have setup into the interface types allowing you to work with the parameters in the app. open the file element\src\types\interfaces.ts and then add the parameters into the ParameterData interface where you will find the theme parameters already set up.

```typescript
export interface ParameterData {
  primary_color?: string;
  secondary_color?: string;
  tertiary_color?: string;
  nav_and_background_colors?: string;
  background_color?: string;
}
```

### Setting up the proxy and main application

in the terminal cd into the proxy_server root folder and run the following commands to get set up.

```
npm i
npm run compile
```

Then update the .env file with the instance that you will be using so that the API calls are going to the correct place. This will be just the BASE_URL

```
HOST=localhost
PORT=3001

BASE_URL=PROXY_URL
```

Then cd back into the element root folder you will need to create a new .env.development file and then copy the code from the .env.example over. Add you own user name and password for the Catalyst instance that you are using in the proxy_server the BASE_URL that you set up, and then install the dependencies.

```
VITE_APP_USER_NAME=YOUR_ALX_USER_NAME
VITE_APP_USER_PASSWORD=YOUR_ALX_PASSWORD
VITE_APP_BASE_URL=http://localhost:3001
```

```
npm i
```

Now you are ready to run the application for testing.

```
npm run dev
```

You should see the following your browser when you go to http://localhost:5173/ you should see in the dev tools under the network setting that you get a successful login api request.
![Successful application running screen](/img/success.png)

If you get the following error then you need to check that you have entered the correct user credentials for the instance of catalyst your proxy_server is connecting to.

![failed application running screen](/img/failed_login.png)

### Congratulations you are now ready to start building your own element.

A good starting point to in the element\src\components\Element\index.tsx.

### If you have any issues or question then you can raise a Zendesk support ticket or alternatively you can raise an issue in this repo and I will do my best to respond the same day.
