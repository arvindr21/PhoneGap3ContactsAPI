document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    if ($("#contactsList").length == 1) {
        $("body").addClass('ui-disabled').css("background", "#000");
        $.mobile.loading("show");
        var options = new ContactFindOptions();
        options.filter = "";
        options.multiple = true;
        var filter = ["displayName", "phoneNumbers"];
        navigator.contacts.find(filter, onSuccess, onError, options);
    } else if ($("#addContact").length == 1) {
        bindAddContactEvents();
    }
}

function onSuccess(contacts) {
    var html = "";
    for (var i = 0; i < contacts.length; i++) {
        if ($.trim(contacts[i].displayName).length != 0) {
            html += '<li data-role="collapsible" data-iconpos="right" data-shadow="false" data-corners="false">';
            html += '<h2>' + contacts[i].displayName + '</h2>';
            html += '<h3>Phone Numbers</h3>';
            for (var j = 0; j < contacts[i].phoneNumbers.length; j++) {
                html += "Type: " + contacts[i].phoneNumbers[j].type + "\n" +
                    "Value: " + contacts[i].phoneNumbers[j].value + "\n" +
                    "Preferred: " + contacts[i].phoneNumbers[j].pref + "</hr>";
            }
            html += '</li>';
        }
    }
    $("#contactsList").html(html);
    $("#contactsList").listview('refresh');
    $.mobile.loading("hide");
    $("body").removeClass('ui-disabled');
}

function onError(contactError) {
    alert('Oops Something went wrong!');
    $.mobile.loading("hide");
    $("body").removeClass('ui-disabled');
}

function bindAddContactEvents() {
    $("#addContact").on("click", function () {
        var name = $.trim($("#name").val()),
            number = $.trim($("#number").val());

        if (name.length == 0) {
            alert("Please enter a valid Name");
            return false;
        }

        if (number.length == 0) {
            alert("Please enter a valid Number");
            return false;
        }

        var contact = navigator.contacts.create();
        contact.displayName = name;
        contact.nickname = name;

        var phoneNumbers = [];
        phoneNumbers[0] = new ContactField('mobile', number, true);
        contact.save(createSuccess, createError);
    });
}

function createSuccess() {
    alert("Contact has been successfully added");
    resetPage();
}

function createError() {
    alert("Oops Something went wrong! Please try again later.");
}

function resetPage() {
    $("#name").val("");
    $("#number").val("");
}