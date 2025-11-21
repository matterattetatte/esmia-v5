(function(window, document){"use strict";function skGetEnvironmentUrls(folder_name) {
    // auto detect live and dev version
    var scripts = document.getElementsByTagName("script");
    var scripts_length = scripts.length;
    var search_result = -1;
    var other_result = -1;
    var app_url = "https://widgets.sociablekit.com/";
    var app_backend_url = "https://api.accentapi.com/v1/";
    var app_file_server_url = "https://data.accentapi.com/feed/";
    var sk_app_url = "https://sociablekit.com/app/";
    var sk_api_url = "https://api.sociablekit.com/";
    var sk_img_url = "https://images.sociablekit.com/";
    var sk_fb_sync_url = "https://facebook-sync.sociablekit.com/";
    for (var i = 0; i < scripts_length; i++) {
        var src_str = scripts[i].getAttribute('src');
        if (src_str != null) {
            var other_folder = "";
            if (folder_name == 'facebook-page-playlists') {
                other_folder = 'facebook-page-playlist';
            }
            else if (folder_name == 'linkedin-page-posts') {
                other_folder = 'linkedin-page-post';
            }
            else if (folder_name == 'linkedin-profile-posts') {
                other_folder = 'linkedin-profile-post';
            }
            else if (folder_name == 'facebook-hashtag-posts') {
                other_folder = 'facebook-hashtag-feed';
            }
            else if (folder_name == 'facebook-page-events') {
                other_folder = 'facebook-events';
            }
            else if (folder_name == 'facebook-page-posts') {
                other_folder = 'facebook-feed';
                if (document.querySelector(".sk-ww-facebook-feed")) {
                    var element = document.getElementsByClassName("sk-ww-facebook-feed")[0];
                    element.classList.add("sk-ww-facebook-page-posts");
                }
            }
            other_result = src_str.search(other_folder);
            search_result = src_str.search(folder_name);
            // app-dev found if greater than or equal to 1
            if (search_result >= 1 || other_result >= 1) {
                var src_arr = src_str.split(folder_name);
                app_url = src_arr[0];

                // replace if displaysocialmedia.com
                app_url = app_url.replace("displaysocialmedia.com", "sociablekit.com");
                // get app backend url
                if (app_url.search("_local") >= 1) { //hehe comment out for hacking purposes!
                    app_backend_url = "http://localhost:3000/v1/";
                    app_url = "https://localtesting.com/SociableKIT_Widgets/";
                    app_file_server_url = "https://localtesting.com/SociableKIT_FileServer/feed/";
                    sk_app_url = "https://localtesting.com/SociableKIT/";
                    sk_api_url = "http://127.0.0.1:8000/";
                    sk_img_url = "https://localtesting.com/SociableKIT_Images/";
                    sk_fb_sync_url = "https://localtesting.com/SociableKIT_Facebook_Sync/";
                }
                else {
                    app_url = "https://widgets.sociablekit.com/";
                }
            }
        }
    }

    return {
        "app_url": app_url,
        "app_backend_url": app_backend_url,
        "app_file_server_url": app_file_server_url,
        "sk_api_url": sk_api_url,
        "sk_app_url": sk_app_url,
        "sk_img_url" : sk_img_url,
        "sk_fb_sync_url" : sk_fb_sync_url
    };
}

function applySearchFeature(data_storage,search_term){
    var new_posts_lists = [];
    jQuery.each(data_storage,function(index, value){
        if(value.message && value.message.toLowerCase().indexOf(search_term.toLowerCase()) != -1){
            new_posts_lists.push(value);
        }
        else if(value.post_id && value.post_id.indexOf(search_term) != -1){
            new_posts_lists.push(value);
        }
    });

    return new_posts_lists;
}
function showOnlyOwnData(sk_facebook_feed, posts, bio){
    var new_posts_lists = [];
    var post_ids = [];
    jQuery.each(posts,function(index, value){
        if(post_ids.includes(value.id) == false && value.page_id && value.page_id == getDsmSetting(sk_facebook_feed,'fb_page_id')){
            post_ids.push(value.id);
            new_posts_lists.push(value);
        }
        else if(post_ids.includes(value.id) == false && value.id && value.id.includes(getDsmSetting(sk_facebook_feed,'fb_page_id'))){
            post_ids.push(value.id);
            new_posts_lists.push(value);
        }
        else if(post_ids.includes(value.id) == false && value.id.includes(bio.id)){
            post_ids.push(value.id);
            new_posts_lists.push(value);
        }
    });
    return new_posts_lists;
}

function removeBlankContent(sk_facebook_feed, posts){
    var new_posts_lists = [];
    jQuery.each(posts,function(index, value){
        if((!value.media_attachments || value.media_attachments.length == 0) && !value.message && !value.full_picture && !value.video_url){
            
        }
        else {
            new_posts_lists.push(value);
        }
    });

    return new_posts_lists;
}

function customCssChecker() {
    var url = window.location.href;
    if(url && url.indexOf("kalix.se") > -1) {
        return;
    }
    loadCssFile("https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css");
}


async function showSharedPosts(sk_facebook_feed, to_sync){
    sk_facebook_feed.find('.sk-meta-data').each(async function(){
        var object_element = jQuery(this);
        if(!object_element.hasClass('sk-meta-done')){
            var parent_id = object_element.attr('id');
            var object_id = object_element.attr('data-id');
            var embed_id=getDsmEmbedId(sk_facebook_feed);
            var json_url=sk_fb_sync_url + "sync_post.php?parent_id=" + parent_id + "&embed_id="+embed_id;

            jQuery.getJSON(json_url, function(data){
                if(data.id && data.from){
                    object_element.addClass('sk-meta-done');
                    var post_items="<div>";
                        post_items+="<div class='sk-meta-data-info'>";
                            post_items+="<img loading='lazy' src='https://graph.facebook.com/v5.0/"+data.from.id+"/picture/?type=large&access_token='/>";
                            post_items+="<div><b>"+data.from.name+"</b></div>";
                        post_items+="</div>";
                        if(data.message){
                            post_items+="<div class='sk-meta-data-content'>";
                                post_items+=data.message;
                            post_items+="</div>";
                        }
                        if(data.full_picture){
                            post_items+="<div class='sk-meta-data-media' onclick=\"window.open('" + data.permalink_url + "');\">";
                                post_items+="<img loading='lazy' src='"+data.full_picture+"'/>";
                            post_items+="</div>";
                        }
                        
                        post_items+="</div>";
                    object_element.html(post_items);
                }
                else{
                    var item = data_storage.find(item => item.id === object_id);
                    if(item && item.media_attachments && item.media_attachments[0] && item.media_attachments[0].thumbnail){
                        var one_data = item.media_attachments[0];
                        object_element.addClass('sk-meta-done');
                        var post_items="<div>";
                            if(one_data.description){
                                post_items+="<div class='sk-meta-data-content'>";
                                    post_items+=one_data.description;
                                post_items+="</div>";
                            }
                            else if(one_data.title){
                                post_items+="<div class='sk-meta-data-content'>";
                                    post_items+=one_data.title;
                                post_items+="</div>";
                            }
                            
                            if(one_data.thumbnail){
                                post_items+="<div class='sk-meta-data-media' onclick=\"window.open('" + one_data.url + "');\">";
                                    post_items+="<img loading='lazy' src='"+one_data.thumbnail+"'/>";
                                post_items+="</div>";
                            }
                            
                            post_items+="</div>";
                        object_element.html(post_items);
                    }
                    else{
                        object_element.remove();
                    }
                }

                var elements = object_element.find(".sk-meta-data-content");

                for(var i = 0; i < elements.length; i++){
                    replaceContentWithLinks(jQuery(elements[i]),sk_facebook_feed);
                }
                
            }).fail(function(e){
                console.log("Shared content is missing.");
            });
        }
    })
}

function applyDateFormat(sk_facebook_feed, data_storage){
    var date_format = getDsmSetting(sk_facebook_feed,'date_format');
    var use_24_hour_clock = getDsmSetting(sk_facebook_feed,'use_24_hour_clock');
    var timezone = getDsmSetting(sk_facebook_feed,'timezone');
    var show_time_posted = getDsmSetting(sk_facebook_feed,'show_time_posted');
    var show_post_date = getDsmSetting(sk_facebook_feed,'show_post_date');
    var format = 'MMM D, YYYY';
    if (date_format == 'M d, Y') {
        format = 'MMM D, YYYY';
    }
    else if (date_format == 'jS M Y') {
        format = 'Do MMM YYYY';
    }
    else if (date_format == 'Y M jS') {
        format = 'YYYY MMM Do';
    }
    else if (date_format == 'Y-m-d') {
        format = 'YYYY-MM-D';
    }
    else if (date_format == 'm/d/Y') {
        format = 'MM/D/YYYY';
    }
    else if (date_format == 'd/m/Y') {
        format = 'D/MM/YYYY';
    }
    else if (date_format == 'd.m.Y') {
        format = 'D.MM.YYYY';
    }
    else if (date_format == 'd-m-Y') {
        format = 'D-MM-YYYY';
    }
    
    // time format
    if (use_24_hour_clock == 1 && show_time_posted == 1) {
        format = format + ' HH:mm';
    } 
    else if(show_time_posted == 1) {
        format = format + ' hh:mm A';
    }
    
    var new_posts_lists = [];
    jQuery.each(data_storage,function(index, value){
        // format actual date

        if(data_storage[index] && data_storage[index].created_time){
            var date_time = data_storage[index].backdated_time ? data_storage[index].backdated_time : data_storage[index].created_time;
            if (date_time && show_time_posted != 1) {
                date_time = date_time.split("T")[0];
            }
            if (show_post_date == 1
                && timezone) {
                try{
                    data_storage[index].post_date_time = moment(date_time).tz(timezone).format(format);
                }catch{                
                    data_storage[index].post_date_time = moment(date_time).format(format);
                }
            }
            else{
                data_storage[index].post_date_time = moment(date_time).format(format);
            }
        }
        
        
    });
    return data_storage;
    
}

function predefinedPostFeature(data_storage, predefined_search_keyword) {
    var keywords = predefined_search_keyword.split(",");
    console.log(keywords);
    var new_posts_list = [];
    for (let item of data_storage) {
        if (item) {
            for(var i = 0; i < keywords.length; i++){
                if (item.message && item.message.toLowerCase().indexOf(keywords[i].trim().toLowerCase()) != -1) {
                    new_posts_list.push(item);
                    break;
                }
                else if (item.description && item.description.toLowerCase().indexOf(keywords[i].trim().toLowerCase()) != -1) {
                    new_posts_list.push(item);
                    break;
                }
                else if (item.name && item.name.toLowerCase().indexOf(keywords[i].trim().toLowerCase()) != -1) {
                    new_posts_list.push(item);
                    break;
                }
            }
        }
    };
    return new_posts_list;
}

function moderationTabFeature(sk_facebook_feed, data_storage, turnon_preapproval_posts) {
    var preapproved_posts = [];
    var excluded_posts = [];
    if (turnon_preapproval_posts == 1) {
        if(getDsmSetting(sk_facebook_feed, "preapproved_posts") != ""){
            preapproved_posts = getDsmSetting(sk_facebook_feed, "preapproved_posts").split(",");
        }
    }else if (getDsmSetting(sk_facebook_feed, "excluded_posts") != "") {
        excluded_posts = getDsmSetting(sk_facebook_feed, "excluded_posts").split(",");
    }
    var new_posts_list = [];
    for (let item of data_storage) {
        if (item) {
            //temp fix, data not available in API.
            if(["106330322743688_479124244255671", "106330322743688_478210624347033", "106330322743688_477298584438237"].includes(item.id)){
                item.media_attachments = [
                    {
                    "thumbnail": "https://external-ord5-1.xx.fbcdn.net/emg1/v/t13/17436627457658256848?url=https%3A%2F%2Fwww.kalix.se%2Fcontentassets%2Fa2544fcc5e67452aa68428023fc8c1b3%2F304808120_110394221803604_7568028101721080709_n.jpg&fb_obo=1&utld=kalix.se&stp=c0.5000x0.5000f_dst-emg0_p360x360_q75&ccb=13-1&oh=06_AaokQwVvgz9JSNRLmKVsq_-7OCuvVfoXi45SvQAoWUrpKg&oe=6349130D&_nc_sid=834697",
                    "type": "share",
                    "description": "Den 10â€“13 oktober 2022 kan du som vill lÃ¤ra dig mer om psykisk hÃ¤lsa ta del av en rad intressanta fÃ¶relÃ¤sningar â€“ helt kostnadsfritt.",
                    "title": "Norrbottens digitala vecka fÃ¶r psykisk hÃ¤lsa",
                    "source": "",
                    "url": "https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.kalix.se%2FAktuellt%2FOmsorg-och-raddning%2Fnorrbottens-digitala-vecka-for-psykisk-halsa%2F&h=AT3D0MDblxZM5hCTmBPGdhq-JDUukHsbGYh9nXDQecR1rurkrVGOxLp3U7wBqMLAItC4rOzATj00oM1PorL5dLETawOzJnUPEn--SJa02H47Zx081idrUQPbE2MhipgH&s=1"
                    }
                ]
            }
            if (turnon_preapproval_posts == 1) {
                if (preapproved_posts.includes(item.id)) {
                    new_posts_list.push(item);
                }
            }
            else {
                if (turnon_preapproval_posts == 0 && excluded_posts.includes(item.id)) {
                }
                else {
                    app_url = "https://widgets.sociablekit.com/";
                }
            }
        }
    }

    return {
        "app_url": app_url,
        "app_backend_url": app_backend_url,
        "app_file_server_url": app_file_server_url,
        "sk_api_url": sk_api_url,
        "sk_app_url": sk_app_url,
        "sk_img_url" : sk_img_url,
        "sk_fb_sync_url" : sk_fb_sync_url
    };
}

function getDsmEmbedId(sk_linkedin_page_post){
    var embed_id = sk_linkedin_page_post.getAttribute('embed-id');
    if(embed_id==undefined){
        embed_id = sk_linkedin_page_post.getAttribute('data-embed-id');
    }

    return embed_id;
}

function slugifyString(str){

    str = str.replace(/^\s+|\s+$/g, '');

    // Make the string lowercase
    str = str.toLowerCase();

    // Remove accents, swap Ã± for n, etc
    var from = "ÃÃ„Ã‚Ã€ÃƒÃ…ÄŒÃ‡Ä†ÄŽÃ‰ÄšÃ‹ÃˆÃŠáº¼Ä”È†ÃÃŒÃŽÃÅ‡Ã‘Ã“Ã–Ã’Ã”Ã•Ã˜Å˜Å”Å Å¤ÃšÅ®ÃœÃ™Ã›ÃÅ¸Å½Ã¡Ã¤Ã¢Ã Ã£Ã¥ÄÃ§Ä‡ÄÃ©Ä›Ã«Ã¨Ãªáº½Ä•È‡Ã­Ã¬Ã®Ã¯ÅˆÃ±Ã³Ã¶Ã²Ã´ÃµÃ¸Ã°Å™Å•Å¡Å¥ÃºÅ¯Ã¼Ã¹Ã»Ã½Ã¿Å¾Ã¾ÃžÄÄ‘ÃŸÃ†aÂ·/_,:;";
    var to   = "AAAAAACCCDEEEEEEEEIIIINNOOOOOORRSTUUUUUYYZaaaaaacccdeeeeeeeeiiiinnooooooorrstuuuuuyyzbBDdBAa------";
    for (var i=0, l=from.length ; i<l ; i++) {
    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }

    // Remove invalid chars
    str = str.replace(/[^a-z0-9 -]/g, '') 
    // Collapse whitespace and replace by -
    .replace(/\s+/g, '-') 
    // Collapse dashes
    .replace(/-+/g, '-'); 

    return str;
}

function generateBlueMessage(_sk,user_info){
    var tutorial_link = "";
    var sk_error_message = "";
    if(user_info.solution_name){
        var slugify_string = slugifyString(user_info.solution_name);
        tutorial_link = "https://www.sociablekit.com/tutorials/embed-"+ slugify_string +"-website/";
    }
    if(user_info.type == 9){
        tutorial_link = "https://www.sociablekit.com/sync-facebook-page-events-to-google-calendar/";
    }
    else if(user_info.type == 26){
        tutorial_link = "https://www.sociablekit.com/how-to-sync-facebook-group-events-to-google-calendar-on-website/";
    } 
    if (user_info.widget_status == 1) {
        var sk_error_message  = "<div class='sk_error_message'>";
                sk_error_message  += "<p style='text-align: center !important; margin: 1rem'> The widget does not exist. If you think this is a mistake, please contact support</a></p>";
            sk_error_message  += "</div>";
        return sk_error_message;
    }
    if(user_info.show_feed == false) {
        if(!user_info.message || user_info.message == ""){
            var sk_error_message  = "<ul class='sk_error_message'>";
                sk_error_message  += "<li><a href='"+ tutorial_link +"' target='_blank'>"+user_info.solution_name+" powered by SociableKIT</a></li>";
                sk_error_message  += "<li>If youâ€™re the owner of this website or SociableKIT account used, we found some errors with your account.</li>";
                sk_error_message  += "<li>Please login your SociableKIT account to fix it.</li>";
            sk_error_message  += "</ul>";
            user_info.message = sk_error_message;
        }
        sk_error_message = user_info.message;
    }
    else if (user_info.solution_name == null && user_info.type == null && user_info.start_date == null) {
        sk_error_message ="<p class='sk_error_message'>";
        sk_error_message+="The SociableKIT solution does not exist. If you think this is a mistake, please contact support.";
        sk_error_message+="</p>";
    }
    else{
        sk_error_message ="<div class='sk_error_message'>";
            sk_error_message +="<div style='display: inline-flex;width:100%;'>";
                sk_error_message +="<div>";
                sk_error_message += "<h4>SociableKIT is currently syncing your <a href='"+tutorial_link+"' target='_blank'>"+user_info.solution_name+" widget.</a></h4>";

                sk_error_message += `
                <svg height="20" style="width: 100%; border-radius: 55px !important; overflow: hidden;">
                <rect x="0" y="0" width="480" height="20" fill="#f0f0f0" rx="10" ry="10" />
                <pattern id="stripes" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                    <rect x="0" y="0" width="10" height="20" fill="#007bff" />
                </pattern>
                <rect id="progressBar" x="0" y="0" width="0" height="20" fill="url(#stripes)" rx="10" ry="10">
                    <animate attributeName="width" attributeType="XML" from="0" to="480" dur="2s" repeatCount="indefinite" />
                </rect>
                </svg>`;
                sk_error_message += "<p>While waiting there are a few things you need to know:</p>";
                    sk_error_message +="<ul>";
                        sk_error_message +="<li>It usually takes only a few minutes. We appreciate your patience.</li>";
                        sk_error_message +="<li>We will notify you via email once your "+user_info.solution_name+" feed is ready.</li>";
                        if(user_info.type == 5){
                            sk_error_message += "<li>Make sure your instagram account <a target='_blank' href='https://www.instagram.com/"+getDsmSetting(_sk,'username')+"' target='_blank'><b>@"+getDsmSetting(_sk,'username')+"</b></a> is connected.</li>";
                        }
                        else if(user_info.type == 22 || user_info.type == 39){
                            sk_error_message +="<li>Please make sure that you selected the correct Google Place or that the <a href='https://www.sociablekit.com/how-to-identify-google-place-id/' target='blank'><b> Google Place ID </b></a> you entered is correct.</li>";
                        }
                        else if(user_info.type == 101){
                            sk_error_message +="<li>Please make sure that you have <a href='https://www.sociablekit.com/add-sociablekit-as-your-contact-on-whatsapp/' target='blank'><b> added SociableKIT as your contact on WhatsApp</b></a>.</li>";
                        }
                        else{
                            sk_error_message +="<li>Please make sure that the <b> Source ID/Username </b> you enter is correct.</li>";
                        }
                        sk_error_message +="<li>If you think there is a problem, <a target='_blank' href='https://go.crisp.chat/chat/embed/?website_id=2e3a484e-b418-4643-8dd2-2355d8eddc6b'>chat with support here</a>. We will solve it for you.</li>";
                    sk_error_message+="</ul>";
                sk_error_message +="</div>";
            sk_error_message+="</div>";
        sk_error_message+="</div>";
    }
    return sk_error_message;
}

async function fetchEmbedInfo(embed_id, sk_api_url) {
    let jsonUrl = sk_api_url + "api/user_embed/info/" + embed_id;
    console.log(jsonUrl)
    
    try {
        const response = await fetch(jsonUrl, { method: "GET" });
        const data = response.json();
        return data;
    } catch (err) {
        throw Error("Failed to fetch embed info")
    }
 
}function getMediaColumn(widget,widgetState,settings){
    let columns;
    const innerWidth = widget.offsetWidth > 0 ? widget.offsetWidth : window.innerWidth;

    let tablet_size = 767;
    if (widget.parentElement && widget.parentElement.id === 'embed-code-container') {
        tablet_size = 1500;
    }
    if (innerWidth <= 575) {
        columns = widgetState.column_count_small;
    } else if (innerWidth <= tablet_size) {
        columns = Number(settings.column_count) > 2 ? widgetState.column_count_medium : settings.column_count;
    } else {
        columns =
            Number(settings.column_count) || widgetState.column_count_large || 3;
    }
    return columns;
}
function getMediaColumnCarousel(widget,widgetState,settings){
    let columns;
    const innerWidth = widget.offsetWidth > 0 ? widget.offsetWidth : window.innerWidth;

    let tablet_size = 900;
    if (widget.parentElement && widget.parentElement.id === 'embed-code-container') {
        tablet_size = 1500;
    }

    if (innerWidth <= 520) {
        columns = widgetState.column_count_small;
    } else if (innerWidth <= tablet_size) {
        columns = widgetState.column_count_medium;
    } else {
        columns =
        Number(settings.column_count) || widgetState.column_count_large || 3;
    }
    if (Number(settings.column_count) < columns) {
        columns = Number(settings.column_count);
    }
    return columns;
}
async function skIncreaseView(widgetState) {
    const solution_info = widgetState.widget_data.user_info;
    // track only customer status [1,6,7]
    if (solution_info && solution_info.status && ![1, 6, 7].includes(parseInt(solution_info.status))) {
        return false;
    }
    try {
        // Destructure necessary values from widgetState and widget_data
        const user_id = solution_info.user_id;
        const status = solution_info.status;
        // Get or generate a unique ID
        const widgetId = solution_info.embed_id;
        var sk_views_url = "https://views.sociablekit.com/";
        if(document.URL.includes("local")){
            sk_views_url = "https://localtesting.com/WidgetAnalytics/views/";
        }

        const uniqueId = sessionStorage.getItem('unique_id') || generateUniqueId();

        if (!sessionStorage.getItem('unique_id')) {
            sessionStorage.setItem('unique_id', uniqueId);
        }

        const ipAddress = uniqueId;

        // Prepare payload for tracking views
        const payload = {
            widgetId,
            userId: user_id,
            viewsCount: 1,
            url: getCurrentUrl(),
            ipAddress,
            status,
        };

        // Send tracking data to the server
        const trackResponse = await fetch(`${sk_views_url}track-widget-views.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        // Parse and log the server response
        const responseData = await trackResponse.json();
        console.log('Server Response:', responseData);
    } catch (error) {
        // Log errors with contextual information
        console.error('Error in renderViews:', error);
    }
}

function isTooDarkColor(hexColor) {
    let r, g, b;

    if (hexColor.startsWith('#')) {
        r = parseInt(hexColor.substr(1, 2), 16);
        g = parseInt(hexColor.substr(3, 2), 16);
        b = parseInt(hexColor.substr(5, 2), 16);
    }

    if (hexColor.indexOf('rgb') !== -1) {
        const rgbValues = getRGB(hexColor);
        [r, g, b] = rgbValues;
    }

    b = isNaN(b) ? 0 : b;

    const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;

    return yiq < 60;
}

function getRGB(rgbstr) {
    return rgbstr.substring(4, rgbstr.length-1)
        .replace(/ /g, '')
        .replace('(', '')
        .split(',');
}

function skGetBranding(sk, widgetState) {
    const userInfo = widgetState.widget_data.user_info;
    const widgetSettings = widgetState.widget_data.settings;
    const linkedinWidgets = [33, 34, 44, 58, 75, 99, 100, 103];
    const facebookWidgets = [1, 4, 9, 10, 11, 36, 38, 43, 12, 24, 26, 49, 2, 8, 3, 18, 19, 28, 30, 61];
    const threadsWidgets = [110];

    if (!userInfo) return "";
    userInfo.tutorial_link = userInfo.created_at_ymd && userInfo.created_at_ymd > 20240725
        ? getTutorialLinkNew(userInfo)
        : getTutorialLink(userInfo);

    if (userInfo.show_branding && (userInfo.show_branding == 1
        || userInfo.show_branding == "true")
        || userInfo.show_branding == true 
    ) { 
        const fontFamily = widgetSettings.font_family;
        let linkColor = widgetSettings.details_link_color || "rgb(52, 128, 220)";
        const detailsBgColor = widgetSettings.details_bg_color;

        if (detailsBgColor && !isTooDarkColor(linkColor) && !isTooDarkColor(detailsBgColor)) {
            linkColor = '#3480dc';
        }

        const nofollowAttribute = window.location.href.includes("clean-concept-plus") ? "rel='nofollow'" : "";

        let html = "<div class='sk_branding' style='padding:10px; display:block !important; text-align:center; text-decoration: none !important; color:#555; font-family:" + fontFamily + "; font-size:15px; visibility: visible;'>" +
                "<a " + nofollowAttribute + " class='tutorial_link' href='" + userInfo.tutorial_link + "' target='_blank' style='text-underline-position:under; color:" + linkColor + ";font-size:15px;'>";

        if (linkedinWidgets.includes(userInfo.type) && userInfo.embed_id % 2 === 1) {
            html += "Embed LinkedIn Feed on your " + (userInfo.website_builder && userInfo.website_builder !== "Website" ? userInfo.website_builder : "website");
        } else if (facebookWidgets.includes(userInfo.type) && userInfo.embed_id % 2 === 1) {
            html += "Embed Facebook Feed on your " + (userInfo.website_builder && userInfo.website_builder !== "Website" ? userInfo.website_builder : "") + " website";
        } else {
            html += "Embed " + userInfo.solution_name + " on your " + (userInfo.website_builder && userInfo.website_builder !== "Website" ? userInfo.website_builder : "") + " website";
        }

        html += "</a></div>";
        return html;
    }

    return "";
}

function getTutorialLinkNew(userInfo) {
    const d = new Date(userInfo.createdAt);
    const date = d.getDate();
    let tutorialLink = "";

    if (userInfo.solution_name) {
        let slug = slugifyString(userInfo.solution_name);
        tutorialLink = "https://www.sociablekit.com/tutorials/embed-" + slug + "-website/";
        if (userInfo.website_builder) {
            slug = slugifyString(userInfo.website_builder);
            tutorialLink = "https://www.sociablekit.com/tutorials/embed-" + slug + "/";
        }
    }

    if (date % 5 !== 0) {
        switch (userInfo.type) {
            case 4:
                tutorialLink = "https://www.sociablekit.com/tutorials/embed-facebook-feed-website/";
                break;
            case 5:
                tutorialLink = "https://www.sociablekit.com/tutorials/embed-instagram-feed-website/";
                break;
            case 33:
                tutorialLink = "https://www.sociablekit.com/tutorials/embed-linkedin-feed-website/";
                break;
            case 16:
                tutorialLink = "https://www.sociablekit.com/tutorials/embed-youtube-playlist-website/";
                break;
        }
    }
 
    return tutorialLink;
}

function getTutorialLink(userInfo) {
    let tutorialLink = "";

    if (userInfo.solution_name) {
        let slug = slugifyString(userInfo.solution_name);
        tutorialLink = "https://www.sociablekit.com/tutorials/embed-" + slug + "-website/";

        if (userInfo.website_builder) {
            slug = slugifyString(userInfo.website_builder);
            tutorialLink = "https://www.sociablekit.com/tutorials/embed-" + slug;
        }
    }

    if (userInfo.type === 9) {
        tutorialLink = "https://www.sociablekit.com/sync-facebook-page-events-to-google-calendar/";
    } else if (userInfo.type === 26) {
        tutorialLink = "https://www.sociablekit.com/how-to-sync-facebook-group-events-to-google-calendar-on-website/";
    }

    if (tutorialLink && !tutorialLink.endsWith("/")) {
        tutorialLink += "/";
    }

    const linkedinWidgets = [33, 34, 44, 58, 75, 99, 100, 103];
    const facebookWidgets = [1, 4, 9, 10, 11, 36, 38, 43, 12, 24, 26, 49, 2, 8, 3, 18, 19, 28, 30, 61];
    const threadsWidgets = [110];

    if (linkedinWidgets.includes(userInfo.type) && userInfo.embed_id % 2 === 1) {
        let websiteBuilder = userInfo.website_builder ? slugifyString(userInfo.website_builder) : "website";
        tutorialLink = "https://www.sociablekit.com/tutorials/embed-linkedin-feed-" + websiteBuilder + "/";
    } else if (facebookWidgets.includes(userInfo.type) && userInfo.embed_id % 2 === 1) {
        let websiteBuilder = userInfo.website_builder ? slugifyString(userInfo.website_builder) : "website";
        tutorialLink = "https://www.sociablekit.com/tutorials/embed-facebook-feed-" + websiteBuilder + "/";
    } else if (threadsWidgets.includes(userInfo.type) && userInfo.embed_id % 2 === 0) {
        let websiteBuilder = userInfo.website_builder ? slugifyString(userInfo.website_builder) : "website";
        tutorialLink = "https://www.sociablekit.com/tutorials/embed-threads-" + websiteBuilder + "/";
    }

    if (userInfo.type === 5 && userInfo.embed_id % 2 === 1) {
        tutorialLink = tutorialLink.replace("profile", "feed");
    }

    return tutorialLink;
}

function generateBlueMessage(_sk, user_info){
    var tutorial_link = "";
    var sk_error_message = "";
    if(user_info.solution_name){
        var slugify_string = slugifyString(user_info.solution_name);
        tutorial_link = "https://www.sociablekit.com/tutorials/embed-"+ slugify_string +"-website/";
    }
    if(user_info.type == 9){
        tutorial_link = "https://www.sociablekit.com/sync-facebook-page-events-to-google-calendar/";
    }
    else if(user_info.type == 26){
        tutorial_link = "https://www.sociablekit.com/how-to-sync-facebook-group-events-to-google-calendar-on-website/";
    } 
    if (user_info.widget_status == 1) {
        var sk_error_message  = "<div class='sk_error_message'>";
                sk_error_message  += "<p style='text-align: center !important; margin: 1rem'> The widget does not exist. If you think this is a mistake, please contact support</a></p>";
            sk_error_message  += "</div>";
        return sk_error_message;
    }
    if(user_info.show_feed == false) {
        if(!user_info.message || user_info.message == ""){
            var sk_error_message  = "<ul class='sk_error_message'>";
                sk_error_message  += "<li><a href='"+ tutorial_link +"' target='_blank'>"+user_info.solution_name+" powered by SociableKIT</a></li>";
                sk_error_message  += "<li>If youâ€™re the owner of this website or SociableKIT account used, we found some errors with your account.</li>";
                sk_error_message  += "<li>Please login your SociableKIT account to fix it.</li>";
            sk_error_message  += "</ul>";
            user_info.message = sk_error_message;
        }
        sk_error_message = user_info.message;
    }
    else if (user_info.solution_name == null && user_info.type == null && user_info.start_date == null) {
        sk_error_message ="<p class='sk_error_message'>";
        sk_error_message+="The SociableKIT solution does not exist. If you think this is a mistake, please contact support.";
        sk_error_message+="</p>";
    }
    else{
        sk_error_message ="<div class='sk_error_message'>";
            sk_error_message +="<div style='display: inline-flex;width:100%;'>";
                sk_error_message +="<div>";
                sk_error_message += "<h4>SociableKIT is currently syncing your <a href='"+tutorial_link+"' target='_blank'>"+user_info.solution_name+" widget.</a></h4>";

                sk_error_message += `
                <svg height="20" style="width: 100%; border-radius: 55px !important; overflow: hidden;">
                <rect x="0" y="0" width="480" height="20" fill="#f0f0f0" rx="10" ry="10" />
                <pattern id="stripes" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                    <rect x="0" y="0" width="10" height="20" fill="#007bff" />
                </pattern>
                <rect id="progressBar" x="0" y="0" width="0" height="20" fill="url(#stripes)" rx="10" ry="10">
                    <animate attributeName="width" attributeType="XML" from="0" to="480" dur="2s" repeatCount="indefinite" />
                </rect>
                </svg>`;
                sk_error_message += "<p>While waiting there are a few things you need to know:</p>";
                    sk_error_message +="<ul>";
                        sk_error_message +="<li>It usually takes only a few minutes. We appreciate your patience.</li>";
                        sk_error_message +="<li>We will notify you via email once your "+user_info.solution_name+" feed is ready.</li>";
                        if(user_info.type == 5){
                            sk_error_message += "<li>Make sure your instagram account <a target='_blank' href='https://www.instagram.com/"+getDsmSetting(_sk,'username')+"' target='_blank'><b>@"+getDsmSetting(_sk,'username')+"</b></a> is connected.</li>";
                        }
                        else if(user_info.type == 22 || user_info.type == 39){
                            sk_error_message +="<li>Please make sure that you selected the correct Google Place or that the <a href='https://www.sociablekit.com/how-to-identify-google-place-id/' target='blank'><b> Google Place ID </b></a> you entered is correct.</li>";
                        }
                        else if(user_info.type == 101){
                            sk_error_message +="<li>Please make sure that you have <a href='https://www.sociablekit.com/add-sociablekit-as-your-contact-on-whatsapp/' target='blank'><b> added SociableKIT as your contact on WhatsApp</b></a>.</li>";
                        }
                        else{
                            sk_error_message +="<li>Please make sure that the <b> Source ID/Username </b> you enter is correct.</li>";
                        }
                        sk_error_message +="<li>If you think there is a problem, <a target='_blank' href='https://go.crisp.chat/chat/embed/?website_id=2e3a484e-b418-4643-8dd2-2355d8eddc6b'>chat with support here</a>. We will solve it for you.</li>";
                    sk_error_message+="</ul>";
                sk_error_message +="</div>";
            sk_error_message+="</div>";
        sk_error_message+="</div>";
    }
    return sk_error_message;
}

function generateSolutionMessage(container, embed_id, sk_api_url){
    fetchEmbedInfo(embed_id, sk_api_url)
    .then((data) => {
        const styleElement = document.createElement('style');
        styleElement.type = 'text/css';
        styleElement.appendChild(document.createTextNode(errorCSS));
        document.head.appendChild(styleElement)
        if (Boolean(data.encoded) && data.type == "33") {
            container.innerHTML = `
                <div class="sk-jobs-none">
                    <p>No posts yet.</p>
                    <p>Please try again later.</p>
                </div>
            `;
        } else {
            let message = generateBlueMessage(container, data);
            container.innerHTML = message;
        }
    })
    .catch((err) => {
        console.error(err)
    })

}

async function fetchEmbedInfo(embed_id, sk_api_url) {
    let jsonUrl = sk_api_url + "api/user_embed/info/" + embed_id;
    console.log(jsonUrl)
    
    try {
        const response = await fetch(jsonUrl, { method: "GET" });
        const data = response.json();
        return data;
    } catch (err) {
        throw Error("Failed to fetch embed info")
    }

}

function slugifyString(str){

    str = str.replace(/^\s+|\s+$/g, '');

    // Make the string lowercase
    str = str.toLowerCase();

    // Remove accents, swap Ã± for n, etc
    var from = "ÃÃ„Ã‚Ã€ÃƒÃ…ÄŒÃ‡Ä†ÄŽÃ‰ÄšÃ‹ÃˆÃŠáº¼Ä”È†ÃÃŒÃŽÃÅ‡Ã‘Ã“Ã–Ã’Ã”Ã•Ã˜Å˜Å”Å Å¤ÃšÅ®ÃœÃ™Ã›ÃÅ¸Å½Ã¡Ã¤Ã¢Ã Ã£Ã¥ÄÃ§Ä‡ÄÃ©Ä›Ã«Ã¨Ãªáº½Ä•È‡Ã­Ã¬Ã®Ã¯ÅˆÃ±Ã³Ã¶Ã²Ã´ÃµÃ¸Ã°Å™Å•Å¡Å¥ÃºÅ¯Ã¼Ã¹Ã»Ã½Ã¿Å¾Ã¾ÃžÄÄ‘ÃŸÃ†aÂ·/_,:;";
    var to   = "AAAAAACCCDEEEEEEEEIIIINNOOOOOORRSTUUUUUYYZaaaaaacccdeeeeeeeeiiiinnooooooorrstuuuuuyyzbBDdBAa------";
    for (var i=0, l=from.length ; i<l ; i++) {
    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }

    // Remove invalid chars
    str = str.replace(/[^a-z0-9 -]/g, '') 
    // Collapse whitespace and replace by -
    .replace(/\s+/g, '-') 
    // Collapse dashes
    .replace(/-+/g, '-'); 

    return str;
}

const errorCSS = `
    .sk_error_message{
        font-family: Arial, Helvetica, sans-serif !important;
        font-size: 16px;
        line-height: 30px;
        background-color: #1972f5;
        color: #ffffff;
        padding: 20px 45px;
        border-radius: 3px;
    }

    .sk_error_message * {
        font-family: Arial, Helvetica, sans-serif !important;
    }

    .sk_error_message a{
        color:#ffffff !important;
        text-decoration:underline !important;
    }

    .sk-jobs-none {
        min-height: 300px;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 8px;
    }

    .sk-jobs-none p {
        font-weight: bold;
        font-size: 21px;
        color: inherit;
        font-family: "Arial";
    }
`;

function skGetEnvironmentUrls(folder_name) {
    // auto detect live and dev version
    var scripts = document.getElementsByTagName("script");
    var scripts_length = scripts.length;
    var search_result = -1;
    var other_result = -1;
    var app_url = "https://widgets.sociablekit.com/";
    var app_backend_url = "https://api.accentapi.com/v1/";
    var app_file_server_url = "https://data.accentapi.com/feed/";
    var sk_app_url = "https://sociablekit.com/app/";
    var sk_api_url = "https://api.sociablekit.com/";
    var sk_img_url = "https://images.sociablekit.com/";
    var sk_clicks_url = "https://clicks.sociablekit.com/";
    var sk_scrolls_url = "https://scrolls.sociablekit.com/";
    var sk_views_url = "https://views.sociablekit.com/";
    var sk_fb_sync_url = "https://facebook-sync.sociablekit.com/";
    var sk_yt_syc_url = "https://youtube-sync.sociablekit.com/";
    for (var i = 0; i < scripts_length; i++) {
        var src_str = scripts[i].getAttribute('src');
        if (src_str != null) {
            var other_folder = "";
            if (folder_name == 'facebook-page-playlists') {
                other_folder = 'facebook-page-playlist';
            } else if (folder_name == 'linkedin-page-posts') {
                other_folder = 'linkedin-page-post';
            } else if (folder_name == 'linkedin-profile-posts') {
                other_folder = 'linkedin-profile-post';
            } else if (folder_name == 'facebook-hashtag-posts') {
                other_folder = 'facebook-hashtag-feed';
            } else if (folder_name == 'facebook-page-events') {
                other_folder = 'facebook-events';
            } else if (folder_name == 'facebook-page-posts') {
                other_folder = 'facebook-feed';
                if (document.querySelector(".sk-ww-facebook-feed")) {
                    var element = document.getElementsByClassName("sk-ww-facebook-feed")[0];
                    element.classList.add("sk-ww-facebook-page-posts");
                }
            }
            other_result = src_str.search(other_folder);
            search_result = src_str.search(folder_name);
            // app-dev found if greater than or equal to 1
            if (search_result >= 1 || other_result >= 1) {
                var src_arr = src_str.split(folder_name);
                app_url = src_arr[0];

                // replace if displaysocialmedia.com
                app_url = app_url.replace("displaysocialmedia.com", "sociablekit.com");
                // get app backend url
                if (app_url.search("local") >= 1) {
                    app_backend_url = "http://localhost:3000/v1/";
                    app_url = "https://localtesting.com/SociableKIT_Widgets/";
                    app_file_server_url = "https://localtesting.com/SociableKIT_FileServer/feed/";
                    sk_app_url = "https://localtesting.com/SociableKIT/";
                    sk_api_url = "http://127.0.0.1:8000/";
                    sk_img_url = "https://localtesting.com/SociableKIT_Images/";
                    sk_fb_sync_url = "https://localtesting.com/SociableKIT_Facebook_Sync/";
                    sk_scrolls_url = "https://localtesting.com/WidgetAnalytics/scrolls/";
                    sk_views_url = "https://localtesting.com/WidgetAnalytics/views/";
                    sk_clicks_url = "https://localtesting.com/WidgetAnalytics/clicks/";
                    sk_yt_syc_url = "https://localtesting.com/SociableKIT_YouTube_Sync/";
                } else {
                    app_url = "https://widgets.sociablekit.com/";
                    sk_scrolls_url = "https://scrolls.sociablekit.com/";
                    sk_views_url = "https://views.sociablekit.com/";
                    sk_clicks_url = "https://clicks.sociablekit.com/";
                }
            }
        }
    }

    return {
        "app_url": app_url,
        "app_backend_url": app_backend_url,
        "app_file_server_url": app_file_server_url,
        "sk_api_url": sk_api_url,
        "sk_app_url": sk_app_url,
        "sk_img_url": sk_img_url,
        "sk_scrolls_url": sk_scrolls_url,
        "sk_views_url": sk_views_url,
        "sk_clicks_url": sk_clicks_url,
        "sk_yt_syc_url" : sk_yt_syc_url,
        "sk_fb_sync_url": sk_fb_sync_url
    };
}

function getEnvironmentUrls(widgetState, key) {
    const env_urls = skGetEnvironmentUrls(key);
    widgetState.app_url = env_urls.app_url;
    widgetState.app_backend_url = env_urls.app_backend_url;
    widgetState.app_file_server_url = env_urls.app_file_server_url;
    widgetState.sk_img_url = env_urls.sk_img_url;
    widgetState.sk_app_url = env_urls.sk_app_url;
    widgetState.sk_api_url = env_urls.sk_api_url;
    widgetState.sk_clicks_url = env_urls.sk_clicks_url;
    widgetState.sk_scrolls_url = env_urls.sk_scrolls_url;
    widgetState.sk_views_url = env_urls.sk_views_url;
    widgetState.sk_yt_syc_url = env_urls.sk_yt_syc_url;
}

function renderClick(widget,widgetState){
    // Add event listener for all clickable elements in the widget
    const { sk_clicks_url,widget_data } = widgetState;
    const { solution_info, settings, user_info } = widget_data;
    let user_id =
        (solution_info && solution_info.user_id) ||
        (settings && settings.user_id) ||
        (user_info && user_info.user_id);

    // track only customer status [1,6,7]
    if (solution_info && solution_info.status && ![1, 6, 7].includes(parseInt(solution_info.status))) {
        return false;
    }

    widget.addEventListener('click', (event) => {
        const target = event.target;
        let elementType = '';
        let elementContent = '';

        // Determine the type and content of the clicked element
        elementType = target.tagName.toLowerCase(); // Use the tag name as the element type

        // Get meaningful content based on the tag type or attributes
        if (target.tagName === 'BUTTON' || target.tagName === 'A') {
            elementContent = target.innerText.trim() || target.getAttribute('href') || 'Unnamed Element';
        } else if (target.tagName === 'IMG') {
            elementContent = target.getAttribute('alt') || target.getAttribute('src') || 'Unnamed Image';
        } else if (target.tagName === 'VIDEO' || target.tagName === 'AUDIO') {
            elementContent = target.getAttribute('src') || 'Unnamed Media';
        } else if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
            elementContent = target.value || 'Unnamed Input';
        } else {
            elementContent = (target.innerText ? target.innerText.trim() : '') || target.className || `Unnamed ${elementType}`;
        }
        // Get the widgetId from the widget container
        const widgetId = widget.getAttribute('data-embed-id');

        if (elementType) {
            // Send click data to the backend
            fetch(sk_clicks_url+'track-widget-click.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    widgetId: widgetId,
                    userId: user_id,
                    url: getCurrentUrl(),
                    elementType,
                    elementContent,
                }),
            })
                .then((response) => response.json())
                .then((data) => console.log('Click logged:', data))
                .catch((error) => console.error('Error logging click:', error));
        }
    });
}
function renderScroll(widget,widgetState){

    // Add event listener for all clickable elements in the widget
    const { sk_scrolls_url,widget_data } = widgetState;
    const { solution_info, settings, user_info } = widget_data;
    let user_id =
        (solution_info && solution_info.user_id) ||
        (settings && settings.user_id) ||
        (user_info && user_info.user_id);

    // track only customer status [1,6,7]
    if (solution_info && solution_info.status && ![1, 6, 7].includes(parseInt(solution_info.status))) {
        return false;
    }
    
    let scrollCount = 0;
    let scrollTimeout;
    let uniqueId = null;
    const widgetId = widget.getAttribute('data-embed-id');

    // Save unique ID to sessionStorage to keep it persistent
    try {
        uniqueId = sessionStorage.getItem('unique_id') || generateUniqueId();
        if (!sessionStorage.getItem('unique_id')) {
            sessionStorage.setItem('unique_id', uniqueId);
        }
    } catch (e) {
        uniqueId = generateUniqueId();
    }
    
    // Scroll event listener
    window.addEventListener('scroll', () => {
        scrollCount++;
        // Clear the previous timeout and set a new one
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(sendScrollData, 2000); // Send data 1 second after scrolling stops
    });
    
    // Send scroll data to the server
    function sendScrollData() {
        if (scrollCount > 0) {
            fetch(sk_scrolls_url + 'track-widget-scroll.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    widgetId: widgetId,
                    userId: user_id,
                    scrollCount: scrollCount,
                    url: getCurrentUrl(),
                    uniqueId: uniqueId
                })
            })
            .then(response => response.json())
            .then(data => console.log('Server Response:', data))
            .catch(error => console.error('Error:', error));
    
            // Reset scroll count after sending
            scrollCount = 0;
        }
    }
}
// Function to generate a unique ID (fallback for unique identification)
function generateUniqueId() {
    const currentDate = new Date().toISOString().split('T')[0]; // Get the current date in "Y-m-d" format
    return 'USER:' + (Math.random().toString(36).substr(2, 16)).toUpperCase() + currentDate; // Concatenate the date to the unique ID
}
async function renderViews(widget, widgetState) {
    try {
        // Destructure necessary values from widgetState and widget_data
        const { sk_views_url, widget_data } = widgetState;
        const { solution_info, settings, user_info } = widget_data;

        let user_id =
            (solution_info && solution_info.user_id) ||
            (settings && settings.user_id) ||
            (user_info && user_info.user_id);
        let status =
            (solution_info && solution_info.user_id) ||
            (settings && settings.user_id) ||
            (user_info && user_info.user_id);

        // track only customer status [1,6,7]
        if (solution_info && solution_info.status && ![1, 6, 7].includes(parseInt(solution_info.status))) {
            return false;
        }

        // Get or generate a unique ID
        let uniqueId = null;
        const widgetId = widget.getAttribute('data-embed-id');

        // Save unique ID to localStorage if not already present
        try {
            uniqueId = sessionStorage.getItem('unique_id') || generateUniqueId();
            if (!sessionStorage.getItem('unique_id')) {
                sessionStorage.setItem('unique_id', uniqueId);
            }
        } catch (e) {
            uniqueId = generateUniqueId();
        }

        const ipAddress = uniqueId;
        
        // Prepare payload for tracking views
        const payload = {
            widgetId,
            userId: user_id,
            viewsCount: 1,
            url: getCurrentUrl(),
            ipAddress,
            status,
        };

        // Send tracking data to the server
        const trackResponse = await fetch(`${sk_views_url}track-widget-views.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        // Parse and log the server response
        const responseData = await trackResponse.json();
        console.log('Server Response:', responseData);
    } catch (error) {
        // Log errors with contextual information
        console.error('Error in renderViews:', error);
    }
}

function skLoader(container) {
    const loaderHTML = `
        <div class='sk-widget-loader' style='text-align:center; width:100%; height:auto;'>
            <svg xmlns="http://www.w3.org/2000/svg" style="margin: auto; display: block; shape-rendering: auto;" width="138px" height="138px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                <circle cx="50" cy="50" fill="none" stroke="#1F67ED" stroke-width="5" r="23" stroke-dasharray="108.38 38.13">
                    <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1.6s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform>
                </circle>
            </svg>
        </div>
    `;

    const showLoader = () => {
        const loader = container.querySelector('.sk-widget-loader');
        if (!loader) {
            container.insertAdjacentHTML('afterbegin', loaderHTML);
        }
    }

    // use { offset } to adjust timing of when to remove loader
    // Used in widgets with additional setTimeout (eg. fb-page-events)  
    const hideLoader = ({ offset } = {}) => {
        const loader = container.querySelector('.sk-widget-loader');
        if (loader) {
            if (offset) {
                setTimeout(() => {
                    loader.style.display = 'none';
                }, offset)
            } else {
                loader.style.display = 'none';
            }
        }
    }

    return { showLoader, hideLoader };
}

function addLoader(widget, widgetState) {
    widget.insertAdjacentHTML('beforeend', `
        <div class='first_loading_animation' style='text-align:center; width:100%;'><img src='${widgetState.sk_app_url}images/loader.svg' class='loading-img' style='width:auto !important; display: inline-block !important;' /></div>
    `)
}

async function sendGchatAlert(payload, widgetState) {
    const { sk_app_url, widget_data } = widgetState;
    const { embed_id } = widget_data.solution_info;

    let baseUrl = "https://alert.sociablekit.com/google-alert.php";
    const localIdentifiers = ["localhost", "127.0.0.1", "localtesting"];

    if (localIdentifiers.some(id => window.location.hostname.includes(id))) {
        baseUrl = "https://localtesting.com/Codalify_Alerts/google-alert.php";
    }

    try {
        const response = await fetch(baseUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        const result = await response.text();
        return result;
    } catch (error) {
        console.error("Error sending GChat alert:", error);
    }
}

function fixMasonryListener(widget, widgetState, realignMasonry) {
    const wrapper = widget.querySelector('.sk-posts-masonry, .sk-events-masonry');
    if (!wrapper) return;
  
    let resizeTimeout;
    const debounceRealign = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => realignMasonry(widget, widgetState), 100);
    };
  
    const observer = new ResizeObserver(() => debounceRealign());
    const mutationObserver = new MutationObserver(() => observeItems());
  
    const observeItems = () => {
      wrapper.querySelectorAll('.sk-post-item, .sk-event-item').forEach(item => observer.observe(item));
    };
  
    observeItems();
    mutationObserver.observe(wrapper, { childList: true, subtree: true });
}

function observeImages(img, callback) {
  if (img.tagName === 'IMG') {
    if (img.complete) {
      callback()
    } else {
      img.addEventListener('load', callback);
    }
  }
};

function debounceGlobal(func, delay) {
    let timeoutId;
    return function (...args) {
        const context = this;
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(context, args);
        }, delay);
    };
}

function fixMasonryGlobal(widget, widgetState) {
    const timeouts = [0, 1000, 3000, 5000, 8000, 10000];

    timeouts.forEach(delay => {
        setTimeout(() => realignMasonry(widget, widgetState), delay);
    });
}

function decodeHtmlEntities(str) {
    const txt = document.createElement("textarea");
    txt.innerHTML = str;
    return txt.value;
}

function initUpdatePreview(widget, widgetState, renderLayout, applySettings, classNames = {}) {
    const {
        body = '.sk-posts-body',
        header = '.sk-posts-header',
        footer = '.sk-posts-footer'
    } = classNames;

    window.addEventListener("previewDataUpdated", (event) => {
        const previewData = event.detail.previewData;
        widgetState.widget_data.settings = {
            ...widgetState.widget_data.settings,
            ...previewData.settings,
        };

        if (widget) {
            widget.innerHTML = "";
        }

        widgetState.hasBeenEdited = true

        renderLayout(widget, widgetState);
        applySettings(widget, widgetState);

        const postsBody = widget.querySelector(body);
        if (postsBody) postsBody.style.visibility = "visible";

        const postsHeader = widget.querySelector(header);
        if (postsHeader) postsHeader.style.visibility = "visible";

        const postsFooter = widget.querySelector(footer);
        if (postsFooter) postsFooter.style.visibility = "visible";

        if (window.location.pathname.includes('widgets/update')) {
            // class for determining if the widget has re-rendered
            widget.classList.add('--sk-disable-anim'); 
        }
    });
}

function renderedCharCount(htmlString) {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = htmlString;
  const renderedText = tempDiv.textContent || tempDiv.innerText || "";
  return renderedText.length;
}

function getCurrentUrl() {
    const isInIframe = window.self !== window.top;
    let embedUrl = isInIframe ? (document.referrer || window.location.href) : window.location.href;
    embedUrl = (embedUrl || "").split('?')[0];
    return embedUrl;
}var env_urls = skGetEnvironmentUrls('facebook-page-posts');
var app_url = env_urls.app_url;
var app_backend_url = env_urls.app_backend_url;
var app_file_server_url = env_urls.app_file_server_url;
var sk_img_url = env_urls.sk_img_url;
var sk_app_url = env_urls.sk_app_url;
var sk_api_url  = env_urls.sk_api_url;
var sk_fb_sync_url = env_urls.sk_fb_sync_url;
var eventLoaded = 0;

function loadScript(src, callback) {
    let scriptName = src.split("/").slice(-3).join('/');
    
    let scriptIsLoaded = document.querySelectorAll(`script[src*="${scriptName}"]`)
    
    if (scriptIsLoaded.length > 0) {
        return;
    }

    const script = document.createElement('script');
    script.src = src;
    script.type = 'text/javascript';

    if (callback) {
        script.onload = function () {
            callback();
        }
    }

    document.body.appendChild(script); 
}
window.addEventListener("DOMContentLoaded", function () {
    eventLoaded = 1;
    initializeWidget();
});
setTimeout(function(){
    if (eventLoaded == 0) { initializeWidget();}
}, 500);

function initializeWidget() {
    let url = "https://widgets.sociablekit.com/";
    const localHost = ['127.0.0.1', "::1"]; 

    if (window.location.hostname.includes('localtesting') || window.location.hostname.includes('_localhost') || window.location.hostname.includes('_127.0.0.1')) { // heck for developing locally
        url = "https://localtesting.com/SociableKIT_Widgets/";
    }
    document.querySelectorAll('.sk-ww-facebook-page-posts').forEach(function (el) {
        let fb_event = el;
        let embed_id = getDsmEmbedId(fb_event);

        // Skip elements that have already been processed
        if (fb_event.dataset.processed) {
            return;
        }

        // Mark this element as processed
        fb_event.dataset.processed = "true";

        const { showLoader, hideLoader } = skLoader(fb_event);
        
        showLoader();

        if (!embed_id) {
            const canonicalHref = document.querySelector('[rel="canonical"]')?.getAttribute('href');

            if (canonicalHref && canonicalHref.indexOf("sti29.fr") !== -1) {
                embed_id = 108211;
            }
        }
        
        let new_fb_event_width = window.innerHeight + 100;
        fb_event.height = new_fb_event_width;

        var json_settings_url=app_file_server_url.replace('feed','') + "settings/"+embed_id+"/settings.json?nocache=" + (new Date()).getTime();
        var json_feed_url = app_file_server_url + embed_id + ".json?nocache=" + (new Date()).getTime();

        const loader = fb_event.querySelector('.first_loading_animation');

        fetch(json_feed_url, { method: 'get' })
        .then(function (response) {
            if (!response.ok) {
                console.error("Failed to fetch data");
                loader.remove();
                return;
            }

            return response.json().catch((error) => {
                loader.remove();
                return {}; 
            });
        })
        .then(function (data) {
            // Assign widget_data and use in new and old layouts to prevent double requests of feed data
            const { embed_id } = data.settings            
            if (!window.sk_embed_data) {
                window.sk_embed_data = {};
                window.sk_embed_data[embed_id] = data
            } else {
                window.sk_embed_data[embed_id] = data;
            }

            if (data && data.solution_info && data.bio) {
                if (data.solution_info.use_new_layout == 1) {
                    el.setAttribute('data-ui', 'new')
                    loadScript(url + 'facebook-page-posts/new/widget.js');
                } else {
                    el.setAttribute('data-ui', 'old');
                    loadScript(url + 'facebook-page-posts-old/widget.js', hideLoader);
                }
            } else {
                hideLoader();
                generateSolutionMessage(fb_event, embed_id, sk_api_url);                
            }
        })
        .catch(function (err) {
            hideLoader();
            generateSolutionMessage(fb_event, embed_id, sk_api_url);
        })
    })
};

function getDsmEmbedId(sk_fb_event){
    var embed_id = sk_fb_event.getAttribute('embed-id');
    if(embed_id==undefined){
        embed_id = sk_fb_event.getAttribute('data-embed-id');
    }

    return embed_id;
}}(window, document));