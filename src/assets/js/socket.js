$(function () {

    const topic1 = "tenant001/building001/liquid/001";
    const topic2 = "tenant001/building001/liquid/002";

    const socket = io("wss://iot-api-sg.herokuapp.com", {
        reconnectionDelayMax: 10000,
        path: "/liquid",
        query: {
            topics: topic1 + "~" + topic2
        }
    });

    const updateUi = (topic, msg) => {
        const idx = topic == topic1 ? "1" : "2";
        if (msg == "1") {
            $("#status" + idx).removeClass("bg-warning");
            $("#status" + idx).addClass("bg-success");
            $("#status" + idx).html("ON")
        } else {
            $("#status" + idx).removeClass("bg-success");
            $("#status" + idx).addClass("bg-warning");
            $("#status" + idx).html("OFF")
        }
        $("#dd" + idx).html(moment().format('DD/MM/YYYY'));
        $("#hh" + idx).html(moment().format('HH:mm:ss'));
    }

    socket.on("connect", () => {
        console.log("connected to ", socket.id);
    });

    socket.on(topic1, function (msg) {
        updateUi(topic1, msg);
    });
    socket.on(topic2, function (msg) {
        updateUi(topic2, msg);
    });

});
