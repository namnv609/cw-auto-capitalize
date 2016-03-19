$(function() {
    var autoCapitalizeEnableStatus = getAutoCapitalizeEnableStatus();

    $("#_chatSendTool").append(getAutoCapitalizeToolbar(autoCapitalizeEnableStatus));
    $("input[type=text], textarea").on("keyup keydown", function(e) {
        if (e.which === 13 && autoCapitalizeEnableStatus == "true") {
            var val = $(this).val();

            val = val.replace(/^(([\-|\+|\*]\s)*?[\w\u00C0-\u1EF9])|(\.|\!|\?)\s[a-z\u00C0-\u1EF9]/gmi, function(match) {
                return match.toUpperCase();
            });

            $(this).val(val);
        }
    });
    $("#_chatSendTool").on("click", "#_autoCapitalize", function() {
        autoCapitalizeEnableStatus = (autoCapitalizeEnableStatus == "true") ? "false" : "true";
        setAutoCapitalizeEnableStatus(autoCapitalizeEnableStatus);
        $("#autoCapToggle", $(this)).text(getEnableStatusText(autoCapitalizeEnableStatus));
        $(this).attr("aria-label", getEnableTooltip(autoCapitalizeEnableStatus));
    });

    function getAutoCapitalizeToolbar(isEnable) {
        var enableStatusText = getEnableStatusText(isEnable);
        var enableTooltip = getEnableTooltip(isEnable);

        var autoCapitalize = '\
            <li id="_autoCapitalize" role="button" class="_showDescription" aria-label="' + enableTooltip + '">\
                <span id="autoCapToggle">' + enableStatusText + '</span>\
            </li>\
        ';

        return autoCapitalize;
    }

    function getAutoCapitalizeEnableStatus() {
        var isEnable = localStorage.AUTO_CAPITALIZE_ENABLE_STATUS;

        if (isEnable == null) {
            isEnable = "true";
            setAutoCapitalizeEnableStatus(isEnable);
        }

        return isEnable;
    }

    function setAutoCapitalizeEnableStatus(status) {
        localStorage.AUTO_CAPITALIZE_ENABLE_STATUS = status;
    }

    function getEnableStatusText(isEnable) {
        var text = "OFF";

        if (isEnable == "true") {
            text = "ON";
        }

        return "aA: " + text;
    }

    function getEnableTooltip(isEnable) {
        var tooltip = "enable";

        if (isEnable == "true") {
            tooltip = "disable";
        }

        return "Click to " + tooltip + " auto capitalize";
    }
});
