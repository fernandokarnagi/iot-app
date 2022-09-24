$(function () {

    const topic = "tenant001/building001/liquid/001";

    const socket = io("wss://iot-api-sg.herokuapp.com", {
        reconnectionDelayMax: 10000,
        path: "/liquid",
        query: {
            topic
        }
    });

    socket.on("connect", () => {
        console.log("connected to ", socket.id);
    });
    socket.on(topic, function (msg) {
        if (msg == "1") {
            $("#status1").removeClass("bg-warning");
            $("#status1").addClass("bg-success");
            $("#status1").html("ON")

        } else {
            $("#status1").removeClass("bg-success");
            $("#status1").addClass("bg-warning");
            $("#status1").html("OFF")
        }
        $("#dd1").html(moment().format('DD/MM/YYYY'));
        $("#hh1").html(moment().format('HH:mm:ss'));
    });
});

