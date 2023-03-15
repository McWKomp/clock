var display = document.querySelector(".display");

var select = document.querySelectorAll(".select");

var reset = document.querySelector("#reset-button")
var set = document.querySelector("#set-button")

var date = new Date()

var getHour = date.getHours();
var getMinute = date.getMinutes();
var getSecond = date.getSeconds();

var clock = document.createTextNode(`${"00"}:${"00"}:${"00"}`);

display.append(clock);

var ring = new Audio("./don_pollo.mp3");

class UI {

    static alertShow(bg, message) {
        const div = document.createElement("div");
        const text = document.createTextNode(message);
        div.append(text);
        display.append(div);

        $(div).css({

            "background": `${bg}`,
            "color": "white",
            "borderRadius": "10px",
            "position": "absolute",
            "top": "100px",
            "right": "-250px",
            "max-width": "200px",
            "padding": "10px",
            "fontSize": "20px",
            "boxShadow": "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px"

        });

        setTimeout(() => {
            $(div).fadeOut();
        }, 3500);

    }
}

for (let i = 12; i >= 0; i--) {
    i = i < 10 ? '0' + i : i;
    let option = `<option index="${i}" class="select-value" value="${i}">${i}</option>`;
    select[0].firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i = 59; i >= 0; i--) {
    i = i < 10 ? '0' + i : i;
    let option = `<option index="${i}" class="select-value" value="${i}">${i}</option>`;
    select[1].firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i = 59; i >= 0; i--) {
    i = i < 10 ? '0' + i : i;
    let option = `<option index="${i}" class="select-value" value="${i}">${i}</option>`;
    select[2].firstElementChild.insertAdjacentHTML("afterend", option);
}

reset.disabled = true;

$(set).click(function () {

    var selectedHour = select[0].options[select[0].selectedIndex].value;
    var selectedMinute = select[1].options[select[1].selectedIndex].value;
    var selectedSecond = select[2].options[select[2].selectedIndex].value;

    if (selectedHour == "hour" || selectedMinute == "minute" || selectedSecond == "second") {

        UI.alertShow("#EE669A", "You did not select time!")

    } else {

        $(clock).remove();

        set.disabled = true;
        reset.disabled = false;

        var resetCheck = 0;

        function timeShow() {

            getSecond += 1;
            if (getSecond >= 60) {
                while (getSecond >= 60) {
                    getSecond = 0;
                    getMinute += 1;
                    while (getMinute >= 60) {
                        getMinute = 0;
                        getHour += 1;
                    }
                }
            } else {
                getSecond = getSecond;
            }

            if ($(reset).click(function () {
                resetCheck = 1
            }));

            if (resetCheck == 1) {
                set.disabled = false;
                reset.disabled = true;

                UI.alertShow("#DFD05B", "Clock has been stopped")
                return;
            }

            if (getHour == selectedHour && getMinute == selectedMinute && getSecond == selectedSecond) {
                ring.play()
                ring.loop = true;
                if ($(reset).click(function () {
                    ring.loop = false;
                    ring.pause(0);
                    set.disabled = false;
                    reset.disabled = true;
                }));

                UI.alertShow("#DFD05B", "Time over");
                return;
            }

            clock = document.createTextNode(`${getHour}:${getMinute}:${getSecond}`);

            display.append(clock);

            $(clock.previousSibling).remove();

            setTimeout(function () {
                timeShow()
            }, 1000);
        }

    }
    timeShow()

});