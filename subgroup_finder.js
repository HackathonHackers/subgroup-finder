/*global console, $, callBackWithData, FB, hackers, groups*/

function getGroupDataFromID(FB_ID) {
    'use strict';
    $(document).ready(function () {
        var groups_to_join,
            group_name,
            g;
        if (hackers.hasOwnProperty(FB_ID)) {
            groups_to_join = hackers[FB_ID];
            for (g in groups_to_join) {
                if (groups_to_join.hasOwnProperty(g)) {
                    group_name = groups_to_join[g];
                    if (groups.hasOwnProperty(group_name)) {
                        $("#recommendations").append(
                            "<a href='" +  groups[group_name]
                                + "'>" + group_name + "</a>"
                        );
                        console.log(group_name, groups[group_name]);
                    }
                }
            }
        }
    });
}

function grabFB_ID(e) {
    "use strict";
	FB.getLoginStatus(function (response) {
        getGroupDataFromID(response.authResponse.userID);
    });
}