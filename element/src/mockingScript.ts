if (process.env.NODE_ENV === "development") {
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
        class_id: "1073",
        record_id: "2592",
      },
      endpoint: "http://localhost:3001", //same port as the proxy
      component_parameters: [],
      parameters: {
        field: "field_industry",
        value: "Other",
        latching: true,
        message_style: "bottom",
        message_enabled:
          "The button is enabled for you to click. Please feel free to do that",
        message_disabled:
          "The button is disabled as the operation is not permitted for you",
        label: "Click and change",
        color: "#543544",
        width: "200px",
        // height: "200%",
        // primary_color: "#5A88DB",
        // secondary_color: "#7C8664",
        // tertiary_color: "#DB6D5A",
        // nav_and_background_colors: "#333333",
        // background_color: "#DEDEDE",
      },
    };
    window.postMessage(messageData, "http://localhost:5173/");
  }, 2000);
}
