/*global console, $, callBackWithData, FB, hackers, groups*/

var FB_ID, FBName,
    HH_ID, subgroups;

function getGroupLinks() {
    'use strict';
    
    $(document).ready(function () {
        $.getJSON('js/groups.json', function (data) {
            var g, rec_group;
            for (g in subgroups) {
                if (subgroups.hasOwnProperty(g)) {
                    rec_group = subgroups[g];
                    if (data.hasOwnProperty(rec_group)) {
                        $('#recommendations').append(
                            "<a href='" + data[rec_group] + "'>"
                                + rec_group
                                + "</a><br>"
                        );
                    } else {
                        $('#recommendations').append(
                            "<p>" + rec_group + "</p><br>"
                        );
                    }
                }
            }
        });
    });
}

function getGroupDataFromID() {
    'use strict';
    $(document).ready(function () {
        $.getJSON('js/suggested_groups.json', function (data) {
            if (data.hasOwnProperty(HH_ID)) {
                subgroups = data[HH_ID];
                if (subgroups.length() === 0) {
                    $('#recommendations').append(
                        "It looks like you're not active enough in the group"
                            + " to get a suggestion! Our suggestions are based on"
                            + " your activity (likes and comments) within HH and"
                            + " all of its official public subgroups.<br>"
                            + "Go make your mark in <a href='hh.gd/'>HH</a> and"
                            + " try again some other time!"
                    );
                } else if (subgroups.length() < 5) {
                    $('#recommendations').append(
                        "It looks like you're not active enough in the group to "
                            + " get all 5 suggestion! Our suggestions are based on"
                            + " your activity (likes and comments) within HH and"
                            + " all of its official public subgroups.<br>"
                            + "Go make your mark in <a href='hh.gd/'>HH</a> and"
                            + " try again some other time!"
                    );
                    getGroupLinks();
                } else {
                    getGroupLinks();
                }
            }
        
        });
    });
}

function getGroupID() {
    'use strict';
    $(document).ready(function () {
        $.getJSON('js/names_ids.json', function (data) {
            if (data.hasOwnProperty(FBName)) {
                HH_ID = data[FBName][0];
                getGroupDataFromID();
            }
        });
    });
}

function grabFB_ID() {
    "use strict";
	FB.getLoginStatus(function (response) {
        FB_ID = response.authResponse.userID;
        FB.api(
            '/' + FB_ID.toString(),
            'GET',
            {},
            function (response2) {
                FBName = response2.name;
                getGroupID();
            }
        );
    });
}
