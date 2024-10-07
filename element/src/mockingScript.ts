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
      record_id: "2517",
    },
    endpoint: "http://localhost:3001", //same port as the proxy
    component_parameters: [],
    parameters: {
      field: "field_my_check",
      value: "true",
      latching: false,
      polling_time: 16,
      message_style: "top",
      message_enabled:
        "The button is enabled for you to click. Please feel free to do that",
      message_disabled:
        "The button is disabled as the operation is not permitted for you",
      message_processing:
        "The button is processing some data so please hold on",
      label: "Element",
      // width: "50%",
      // height: "200%",
      color: "#543544",
      // primary_color: "#5A88DB",
      // secondary_color: "#7C8664",
      // tertiary_color: "#DB6D5A",
      // nav_and_background_colors: "#333333",
      // background_color: "#DEDEDE",
    },
  };
  window.postMessage(messageData, "http://localhost:5173/");
}, 2000);