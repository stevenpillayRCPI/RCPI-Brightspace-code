// utils.js — v1.3 (2026-10-12)
let headerStyle = 0;

// Color Template Functionality
const colorSelectors = {
  primary: document.getElementById('primaryColorSelect'),
  secondary: document.getElementById('secondaryColorSelect'),
  tertiary: document.getElementById('tertiaryColorSelect')
};

const copyTemplateBtn = document.getElementById('copyTemplateBtn');

// Define text colors for each base color
const textColorMap = {
  'navy': '#ffffff',      // White text for dark navy
  'gold': '#000000',      // Black text for light gold
  'purple': '#ffffff',    // White text for dark purple
  'yellow': '#000000',    // Black text for bright yellow
  'lightblue': '#000000', // Black text for light blue
  'red': '#000000',       // White text for red
  'forest': '#ffffff',    // White text for dark forest
  'green': '#ffffff',     // White text for green
  'lavender': '#000000'   // Black text for light lavender
};

// Event listeners
const copyStyleBtn = document.getElementById('copyStyleBtn');
copyTemplateBtn.addEventListener('click', copyTemplate);
copyStyleBtn.addEventListener('click', copyStyleOnly);


  // Material Icons (900+ icons)

const materialIcons = [
    "3d_rotation", "ac_unit", "access_alarm", "access_alarms", "access_time", "accessibility",
    "accessible", "account_balance", "account_balance_wallet", "account_box", "account_circle",
    "adb", "add", "add_a_photo", "add_alarm", "add_alert", "add_box", "add_circle",
    "add_circle_outline", "add_location", "add_shopping_cart", "add_to_photos", "add_to_queue",
    "adjust", "airline_seat_flat", "airline_seat_flat_angled", "airline_seat_individual_suite",
    "airline_seat_legroom_extra", "airline_seat_legroom_normal", "airline_seat_legroom_reduced",
    "airline_seat_recline_extra", "airline_seat_recline_normal", "airplanemode_active",
    "airplanemode_inactive", "airplay", "airport_shuttle", "alarm", "alarm_add", "alarm_off",
    "alarm_on", "album", "all_inclusive", "all_out", "android", "announcement", "apps",
    "archive", "arrow_back", "arrow_downward", "arrow_drop_down", "arrow_drop_down_circle",
    "arrow_drop_up", "arrow_forward", "arrow_upward", "art_track", "aspect_ratio", "assessment",
    "assignment", "assignment_ind", "assignment_late", "assignment_return", "assignment_returned",
    "assignment_turned_in", "assistant", "assistant_photo", "attach_file", "attach_money",
    "attachment", "audiotrack", "autorenew", "av_timer", "backspace", "backup", "battery_alert",
    "battery_charging_full", "battery_full", "battery_std", "battery_unknown", "beach_access",
    "beenhere", "block", "bluetooth", "bluetooth_audio", "bluetooth_connected", "bluetooth_disabled",
    "bluetooth_searching", "blur_circular", "blur_linear", "blur_off", "blur_on", "book",
    "bookmark", "bookmark_border", "border_all", "border_bottom", "border_clear", "border_color",
    "border_horizontal", "border_inner", "border_left", "border_outer", "border_right",
    "border_style", "border_top", "border_vertical", "branding_watermark", "brightness_1",
    "brightness_2", "brightness_3", "brightness_4", "brightness_5", "brightness_6", "brightness_7",
    "brightness_auto", "brightness_high", "brightness_low", "brightness_medium", "broken_image",
    "brush", "bubble_chart", "bug_report", "build", "burst_mode", "business", "business_center",
    "cached", "cake", "call", "call_end", "call_made", "call_merge", "call_missed",
    "call_missed_outgoing", "call_received", "call_split", "call_to_action", "camera",
    "camera_alt", "camera_enhance", "camera_front", "camera_rear", "camera_roll", "cancel",
    "card_giftcard", "card_membership", "card_travel", "casino", "cast", "cast_connected",
    "center_focus_strong", "center_focus_weak", "change_history", "chat", "chat_bubble",
    "chat_bubble_outline", "check", "check_box", "check_box_outline_blank", "check_circle",
    "chevron_left", "chevron_right", "child_care", "child_friendly", "chrome_reader_mode",
    "class", "clear", "clear_all", "close", "closed_caption", "cloud", "cloud_circle",
    "cloud_done", "cloud_download", "cloud_off", "cloud_queue", "cloud_upload", "code",
    "collections", "collections_bookmark", "color_lens", "colorize", "comment", "compare",
    "compare_arrows", "computer", "confirmation_number", "contact_mail", "contact_phone",
    "contacts", "content_copy", "content_cut", "content_paste", "control_point",
    "control_point_duplicate", "copyright", "create", "create_new_folder", "credit_card",
    "crop", "crop_16_9", "crop_3_2", "crop_5_4", "crop_7_5", "crop_din", "crop_free",
    "crop_landscape", "crop_original", "crop_portrait", "crop_rotate", "crop_square",
    "dashboard", "data_usage", "date_range", "dehaze", "delete", "delete_forever",
    "delete_sweep", "description", "desktop_mac", "desktop_windows", "details", "developer_board",
    "developer_mode", "device_hub", "devices", "devices_other", "dialer_sip", "dialpad",
    "directions", "directions_bike", "directions_boat", "directions_bus", "directions_car",
    "directions_railway", "directions_run", "directions_subway", "directions_transit",
    "directions_walk", "disc_full", "dns", "do_not_disturb", "do_not_disturb_alt",
    "do_not_disturb_off", "do_not_disturb_on", "dock", "domain", "done", "done_all",
    "donut_large", "donut_small", "drafts", "drag_handle", "drive_eta", "dvr", "edit",
    "edit_location", "eject", "email", "enhanced_encryption", "equalizer", "error",
    "error_outline", "euro_symbol", "ev_station", "event", "event_available", "event_busy",
    "event_note", "event_seat", "exit_to_app", "expand_less", "expand_more", "explicit",
    "explore", "exposure", "exposure_neg_1", "exposure_neg_2", "exposure_plus_1",
    "exposure_plus_2", "exposure_zero", "extension", "face", "fast_forward", "fast_rewind",
    "favorite", "favorite_border", "featured_play_list", "featured_video", "feedback",
    "file_download", "file_upload", "filter", "filter_1", "filter_2", "filter_3",
    "filter_4", "filter_5", "filter_6", "filter_7", "filter_8", "filter_9", "filter_9_plus",
    "filter_b_and_w", "filter_center_focus", "filter_drama", "filter_frames", "filter_hdr",
    "filter_list", "filter_none", "filter_tilt_shift", "filter_vintage", "find_in_page",
    "find_replace", "fingerprint", "first_page", "fitness_center", "flag", "flare",
    "flash_auto", "flash_off", "flash_on", "flight", "flight_land", "flight_takeoff",
    "flip", "flip_to_back", "flip_to_front", "folder", "folder_open", "folder_shared",
    "folder_special", "font_download", "format_align_center", "format_align_justify",
    "format_align_left", "format_align_right", "format_bold", "format_clear", "format_color_fill",
    "format_color_reset", "format_color_text", "format_indent_decrease", "format_indent_increase",
    "format_italic", "format_line_spacing", "format_list_bulleted", "format_list_numbered",
    "format_paint", "format_quote", "format_shapes", "format_size", "format_strikethrough",
    "format_textdirection_l_to_r", "format_textdirection_r_to_l", "format_underlined",
    "forum", "forward", "forward_10", "forward_30", "forward_5", "free_breakfast",
    "fullscreen", "fullscreen_exit", "functions", "g_translate", "gamepad", "games",
    "gavel", "gesture", "get_app", "gif", "golf_course", "gps_fixed", "gps_not_fixed",
    "gps_off", "grade", "gradient", "grain", "graphic_eq", "grid_off", "grid_on",
    "group", "group_add", "group_work", "hd", "hdr_off", "hdr_on", "hdr_strong",
    "hdr_weak", "headset", "headset_mic", "healing", "hearing", "help", "help_outline",
    "high_quality", "highlight", "highlight_off", "history", "home", "hot_tub",
    "hotel", "hourglass_empty", "hourglass_full", "http", "https", "image", "image_aspect_ratio",
    "import_contacts", "import_export", "important_devices", "inbox", "indeterminate_check_box",
    "info", "info_outline", "input", "insert_chart", "insert_comment", "insert_drive_file",
    "insert_emoticon", "insert_invitation", "insert_link", "insert_photo", "invert_colors",
    "invert_colors_off", "iso", "keyboard", "keyboard_arrow_down", "keyboard_arrow_left",
    "keyboard_arrow_right", "keyboard_arrow_up", "keyboard_backspace", "keyboard_capslock",
    "keyboard_hide", "keyboard_return", "keyboard_tab", "keyboard_voice", "kitchen",
    "label", "label_outline", "landscape", "language", "laptop", "laptop_chromebook",
    "laptop_mac", "laptop_windows", "last_page", "launch", "layers", "layers_clear",
    "leak_add", "leak_remove", "lens", "library_add", "library_books", "library_music",
    "lightbulb_outline", "line_style", "line_weight", "linear_scale", "link", "linked_camera",
    "list", "live_help", "live_tv", "local_activity", "local_airport", "local_atm",
    "local_bar", "local_cafe", "local_car_wash", "local_convenience_store", "local_dining",
    "local_drink", "local_florist", "local_gas_station", "local_grocery_store", "local_hospital",
    "local_hotel", "local_laundry_service", "local_library", "local_mall", "local_movies",
    "local_offer", "local_parking", "local_pharmacy", "local_phone", "local_pizza",
    "local_play", "local_post_office", "local_printshop", "local_see", "local_shipping",
    "local_taxi", "location_city", "location_disabled", "location_off", "location_on",
    "location_searching", "lock", "lock_open", "lock_outline", "looks", "looks_3",
    "looks_4", "looks_5", "looks_6", "looks_one", "looks_two", "loop", "loupe",
    "low_priority", "loyalty", "mail", "mail_outline", "map", "markunread", "markunread_mailbox",
    "memory", "menu", "merge_type", "message", "mic", "mic_none", "mic_off", "mms",
    "mode_comment", "mode_edit", "monetization_on", "money_off", "monochrome_photos",
    "mood", "mood_bad", "more", "more_horiz", "more_vert", "motorcycle", "mouse",
    "move_to_inbox", "movie", "movie_creation", "movie_filter", "multiline_chart",
    "music_note", "music_video", "my_location", "nature", "nature_people", "navigate_before",
    "navigate_next", "navigation", "near_me", "network_cell", "network_check", "network_locked",
    "network_wifi", "new_releases", "next_week", "nfc", "no_encryption", "no_sim",
    "not_interested", "note", "note_add", "notifications", "notifications_active",
    "notifications_none", "notifications_off", "notifications_paused", "offline_pin",
    "ondemand_video", "opacity", "open_in_browser", "open_in_new", "open_with", "pages",
    "pageview", "palette", "pan_tool", "panorama", "panorama_fish_eye", "panorama_horizontal",
    "panorama_vertical", "panorama_wide_angle", "party_mode", "pause", "pause_circle_filled",
    "pause_circle_outline", "payment", "people", "people_outline", "perm_camera_mic",
    "perm_contact_calendar", "perm_data_setting", "perm_device_information", "perm_identity",
    "perm_media", "perm_phone_msg", "perm_scan_wifi", "person", "person_add", "person_outline",
    "person_pin", "person_pin_circle", "personal_video", "pets", "phone", "phone_android",
    "phone_bluetooth_speaker", "phone_forwarded", "phone_in_talk", "phone_iphone",
    "phone_locked", "phone_missed", "phone_paused", "phonelink", "phonelink_erase",
    "phonelink_lock", "phonelink_off", "phonelink_ring", "phonelink_setup", "photo",
    "photo_album", "photo_camera", "photo_filter", "photo_library", "photo_size_select_actual",
    "photo_size_select_large", "photo_size_select_small", "picture_as_pdf", "picture_in_picture",
    "picture_in_picture_alt", "pie_chart", "pie_chart_outlined", "pin_drop", "place",
    "play_arrow", "play_circle_filled", "play_circle_outline", "play_for_work", "playlist_add",
    "playlist_add_check", "playlist_play", "plus_one", "poll", "polymer", "pool",
    "portable_wifi_off", "portrait", "power", "power_input", "power_settings_new",
    "pregnant_woman", "present_to_all", "print", "priority_high", "public", "publish",
    "query_builder", "question_answer", "queue", "queue_music", "queue_play_next",
    "radio", "radio_button_checked", "radio_button_unchecked", "rate_review", "receipt",
    "recent_actors", "record_voice_over", "redeem", "redo", "refresh", "remove",
    "remove_circle", "remove_circle_outline", "remove_from_queue", "remove_red_eye",
    "remove_shopping_cart", "reorder", "repeat", "repeat_one", "replay", "replay_10",
    "replay_30", "replay_5", "reply", "reply_all", "report", "report_problem",
    "restaurant", "restaurant_menu", "restore", "restore_from_trash", "restore_page",
    "ring_volume", "room", "room_service", "rotate_90_degrees_ccw", "rotate_left",
    "rotate_right", "rounded_corner", "router", "rowing", "rss_feed", "rv_hookup",
    "satellite", "save", "scanner", "schedule", "school", "screen_lock_landscape",
    "screen_lock_portrait", "screen_lock_rotation", "screen_rotation", "screen_share",
    "sd_card", "sd_storage", "search", "security", "select_all", "send", "sentiment_dissatisfied",
    "sentiment_neutral", "sentiment_satisfied", "sentiment_very_dissatisfied", "sentiment_very_satisfied",
    "settings", "settings_applications", "settings_backup_restore", "settings_bluetooth",
    "settings_brightness", "settings_cell", "settings_ethernet", "settings_input_antenna",
    "settings_input_component", "settings_input_composite", "settings_input_hdmi",
    "settings_input_svideo", "settings_overscan", "settings_phone", "settings_power",
    "settings_remote", "settings_system_daydream", "settings_voice", "share", "shop",
    "shop_two", "shopping_basket", "shopping_cart", "short_text", "show_chart", "shuffle",
    "signal_cellular_4_bar", "signal_cellular_connected_no_internet_4_bar", "signal_cellular_no_sim",
    "signal_cellular_null", "signal_cellular_off", "signal_wifi_4_bar", "signal_wifi_4_bar_lock",
    "signal_wifi_off", "sim_card", "sim_card_alert", "skip_next", "skip_previous",
    "slideshow", "slow_motion_video", "smartphone", "smoke_free", "smoking_rooms",
    "sms", "sms_failed", "snooze", "sort", "sort_by_alpha", "spa", "space_bar",
    "speaker", "speaker_group", "speaker_notes", "speaker_notes_off", "speaker_phone",
    "spellcheck", "star", "star_border", "star_half", "stars", "stay_current_landscape",
    "stay_current_portrait", "stay_primary_landscape", "stay_primary_portrait", "stop",
    "stop_screen_share", "storage", "store", "store_mall_directory", "straighten",
    "streetview", "strikethrough_s", "style", "subdirectory_arrow_left", "subdirectory_arrow_right",
    "subject", "subscriptions", "subtitles", "subway", "supervisor_account", "surround_sound",
    "swap_calls", "swap_horiz", "swap_vert", "swap_vertical_circle", "switch_camera",
    "switch_video", "sync", "sync_disabled", "sync_problem", "system_update", "system_update_alt",
    "tab", "tab_unselected", "tablet", "tablet_android", "tablet_mac", "tag_faces",
    "tap_and_play", "terrain", "text_fields", "text_format", "textsms", "texture",
    "theaters", "thumb_down", "thumb_up", "thumbs_up_down", "time_to_leave", "timelapse",
    "timeline", "timer", "timer_10", "timer_3", "timer_off", "title", "toc",
    "today", "toll", "tonality", "touch_app", "tour", "toys", "track_changes",
    "traffic", "train", "tram", "transfer_within_a_station", "transform", "translate",
    "trending_down", "trending_flat", "trending_up", "tune", "turned_in", "turned_in_not",
    "tv", "unarchive", "undo", "unfold_less", "unfold_more", "update", "usb",
    "verified_user", "vertical_align_bottom", "vertical_align_center", "vertical_align_top",
    "vibration", "video_call", "video_label", "video_library", "videocam", "videocam_off",
    "videogame_asset", "view_agenda", "view_array", "view_carousel", "view_column",
    "view_comfy", "view_compact", "view_day", "view_headline", "view_list", "view_module",
    "view_quilt", "view_stream", "view_week", "vignette", "visibility", "visibility_off",
    "voice_chat", "voicemail", "volume_down", "volume_mute", "volume_off", "volume_up",
    "vpn_key", "vpn_lock", "wallpaper", "warning", "watch", "watch_later", "wb_auto",
    "wb_cloudy", "wb_incandescent", "wb_iridescent", "wb_sunny", "wc", "web", "web_asset",
    "weekend", "whatshot", "widgets", "wifi", "wifi_lock", "wifi_tethering", "work",
    "wrap_text", "youtube_searched_for", "zoom_in", "zoom_out", "zoom_out_map"
];

// Material Symbols (2500+ icons) - These use ligatures
const materialSymbols = [
    "10k", "10k", "10mp", "10mp", "11mp", "11mp", "123", "123", 
"12mp", "12mp", "13mp", "13mp", "14mp", "14mp", "15mp", "15mp", 
"16mp", "16mp", "17mp", "17mp", "18_up_rating", "18_up_rating", "18mp", "18mp", 
"19mp", "19mp", "1k", "1k", "1k_plus", "1k_plus", "1x_mobiledata", "1x_mobiledata", 
"1x_mobiledata_badge", "20mp", "20mp", "21mp", "21mp", "22mp", "22mp", "23mp", 
"23mp", "24fps_select", "24mp", "24mp", "2d", "2k", "2k", "2k_plus", 
"2k_plus", "2mp", "2mp", "30fps", "30fps", "30fps_select", "30fps_select", "360", 
"360", "3d", "3d_rotation", "3d_rotation", "3g_mobiledata", "3g_mobiledata", "3g_mobiledata_badge", "3k", 
"3k", "3k_plus", "3k_plus", "3mp", "3mp", "3p", "3p", "4g_mobiledata", 
"4g_mobiledata", "4g_mobiledata_badge", "4g_plus_mobiledata", "4g_plus_mobiledata", "4k", "4k", "4k_plus", "4k_plus", 
"4mp", "4mp", "50mp", "5g", "5g", "5g_mobiledata_badge", "5k", "5k", 
"5k_plus", "5k_plus", "5mp", "5mp", "60fps", "60fps", "60fps_select", "60fps_select", 
"6_ft_apart", "6_ft_apart", "6k", "6k", "6k_plus", "6k_plus", "6mp", "6mp", 
"7k", "7k", "7k_plus", "7k_plus", "7mp", "7mp", "8k", "8k", 
"8k_plus", "8k_plus", "8mp", "8mp", "9k", "9k", "9k_plus", "9k_plus", 
"9mp", "9mp", "abc", "abc", "ac_unit", "ac_unit", "access_alarm", "access_alarms", 
"access_time", "access_time_filled", "accessibility", "accessibility", "accessibility_new", "accessibility_new", "accessible", "accessible", 
"accessible_forward", "accessible_forward", "accessible_menu", "account_balance", "account_balance", "account_balance_wallet", "account_balance_wallet", "account_box", 
"account_box", "account_child", "account_child_invert", "account_circle", "account_circle", "account_circle_off", "account_tree", "account_tree", 
"action_key", "activity_zone", "acupuncture", "acute", "ad", "ad_group", "ad_group_off", "ad_off", 
"ad_units", "adaptive_audio_mic", "adaptive_audio_mic_off", "adb", "adb", "add", "add", "add_2", 
"add_a_photo", "add_a_photo", "add_ad", "add_alarm", "add_alert", "add_alert", "add_box", "add_box", 
"add_business", "add_business", "add_call", "add_call", "add_card", "add_card", "add_chart", "add_chart", 
"add_circle", "add_circle", "add_circle_outline", "add_column_left", "add_column_right", "add_comment", "add_comment", "add_diamond", 
"add_home", "add_home", "add_home_work", "add_home_work", "add_ic_call", "add_link", "add_link", "add_location", 
"add_location", "add_location_alt", "add_location_alt", "add_moderator", "add_moderator", "add_notes", "add_photo_alternate", "add_photo_alternate", 
"add_reaction", "add_reaction", "add_road", "add_road", "add_row_above", "add_row_below", "add_shopping_cart", "add_shopping_cart", 
"add_task", "add_task", "add_to_drive", "add_to_drive", "add_to_home_screen", "add_to_photos", "add_to_queue", "add_to_queue", 
"add_triangle", "addchart", "adf_scanner", "adf_scanner", "adjust", "adjust", "admin_meds", "admin_panel_settings", 
"admin_panel_settings", "ads_click", "ads_click", "agender", "agriculture", "agriculture", "air", "air", 
"air_freshener", "air_purifier", "air_purifier_gen", "airline_seat_flat", "airline_seat_flat", "airline_seat_flat_angled", "airline_seat_flat_angled", "airline_seat_individual_suite", 
"airline_seat_individual_suite", "airline_seat_legroom_extra", "airline_seat_legroom_extra", "airline_seat_legroom_normal", "airline_seat_legroom_normal", "airline_seat_legroom_reduced", "airline_seat_legroom_reduced", "airline_seat_recline_extra", 
"airline_seat_recline_extra", "airline_seat_recline_normal", "airline_seat_recline_normal", "airline_stops", "airline_stops", "airlines", "airlines", "airplane_ticket", 
"airplane_ticket", "airplanemode_active", "airplanemode_inactive", "airplanemode_inactive", "airplay", "airplay", "airport_shuttle", "airport_shuttle", 
"airwave", "alarm", "alarm", "alarm_add", "alarm_add", "alarm_off", "alarm_off", "alarm_on", 
"alarm_on", "alarm_pause", "alarm_smart_wake", "album", "album", "align_center", "align_end", "align_flex_center", 
"align_flex_end", "align_flex_start", "align_horizontal_center", "align_horizontal_center", "align_horizontal_left", "align_horizontal_left", "align_horizontal_right", "align_horizontal_right", 
"align_items_stretch", "align_justify_center", "align_justify_flex_end", "align_justify_flex_start", "align_justify_space_around", "align_justify_space_between", "align_justify_space_even", "align_justify_stretch", 
"align_self_stretch", "align_space_around", "align_space_between", "align_space_even", "align_start", "align_stretch", "align_vertical_bottom", "align_vertical_bottom", 
"align_vertical_center", "align_vertical_center", "align_vertical_top", "align_vertical_top", "all_inbox", "all_inbox", "all_inclusive", "all_inclusive", 
"all_match", "all_out", "all_out", "allergies", "allergy", "alt_route", "alt_route", "alternate_email", 
"alternate_email", "altitude", "ambulance", "amend", "amp_stories", "analytics", "analytics", "anchor", 
"anchor", "android", "android", "android_cell_4_bar", "android_cell_4_bar_alert", "android_cell_4_bar_off", "android_cell_4_bar_plus", "android_cell_5_bar", 
"android_cell_5_bar_alert", "android_cell_5_bar_off", "android_cell_5_bar_plus", "android_cell_dual_4_bar", "android_cell_dual_4_bar_alert", "android_cell_dual_4_bar_plus", "android_cell_dual_5_bar", "android_cell_dual_5_bar_alert", 
"android_cell_dual_5_bar_plus", "android_wifi_3_bar", "android_wifi_3_bar_alert", "android_wifi_3_bar_lock", "android_wifi_3_bar_off", "android_wifi_3_bar_plus", "android_wifi_3_bar_question", "android_wifi_4_bar", 
"android_wifi_4_bar_alert", "android_wifi_4_bar_lock", "android_wifi_4_bar_off", "android_wifi_4_bar_plus", "android_wifi_4_bar_question", "animated_images", "animation", "animation", 
"announcement", "aod", "aod_tablet", "aod_watch", "apartment", "apartment", "api", "api", 
"apk_document", "apk_install", "app_badging", "app_blocking", "app_registration", "app_registration", "app_settings_alt", "app_shortcut", 
"apparel", "approval", "approval", "approval_delegation", "approval_delegation_off", "apps", "apps", "apps_outage", 
"apps_outage", "aq", "aq_indoor", "ar_on_you", "ar_stickers", "architecture", "architecture", "archive", 
"archive", "area_chart", "area_chart", "arming_countdown", "arrow_and_edge", "arrow_back", "arrow_back", "arrow_back_2", 
"arrow_back_ios", "arrow_back_ios", "arrow_back_ios_new", "arrow_back_ios_new", "arrow_circle_down", "arrow_circle_down", "arrow_circle_left", "arrow_circle_left", 
"arrow_circle_right", "arrow_circle_right", "arrow_circle_up", "arrow_circle_up", "arrow_cool_down", "arrow_downward", "arrow_downward", "arrow_downward_alt", 
"arrow_drop_down", "arrow_drop_down", "arrow_drop_down_circle", "arrow_drop_down_circle", "arrow_drop_up", "arrow_drop_up", "arrow_forward", "arrow_forward", 
"arrow_forward_ios", "arrow_forward_ios", "arrow_insert", "arrow_left", "arrow_left", "arrow_left_alt", "arrow_menu_close", "arrow_menu_open", 
"arrow_or_edge", "arrow_outward", "arrow_outward", "arrow_range", "arrow_right", "arrow_right", "arrow_right_alt", "arrow_right_alt", 
"arrow_selector_tool", "arrow_shape_up", "arrow_shape_up_stack", "arrow_shape_up_stack_2", "arrow_split", "arrow_top_left", "arrow_top_right", "arrow_upload_progress", 
"arrow_upload_ready", "arrow_upward", "arrow_upward", "arrow_upward_alt", "arrow_warm_up", "arrows_input", "arrows_more_down", "arrows_more_up", 
"arrows_output", "arrows_outward", "art_track", "art_track", "article", "article", "article_person", "article_shortcut", 
"artist", "aspect_ratio", "aspect_ratio", "assessment", "assignment", "assignment", "assignment_add", "assignment_add", 
"assignment_globe", "assignment_ind", "assignment_ind", "assignment_late", "assignment_late", "assignment_return", "assignment_return", "assignment_returned", 
"assignment_returned", "assignment_turned_in", "assignment_turned_in", "assist_walker", "assist_walker", "assistant", "assistant_device", "assistant_direction", 
"assistant_direction", "assistant_navigation", "assistant_navigation", "assistant_on_hub", "assistant_photo", "assured_workload", "assured_workload", "asterisk", 
"atm", "atm", "atr", "attach_email", "attach_email", "attach_file", "attach_file", "attach_file_add", 
"attach_file_off", "attach_money", "attach_money", "attachment", "attachment", "attractions", "attractions", "attribution", 
"attribution", "audio_description", "audio_file", "audio_file", "audio_video_receiver", "audiotrack", "auto_awesome", "auto_awesome_mosaic", 
"auto_awesome_mosaic", "auto_awesome_motion", "auto_awesome_motion", "auto_delete", "auto_delete", "auto_fix_high", "auto_fix_normal", "auto_fix_off", 
"auto_graph", "auto_mode", "auto_read_pause", "auto_read_play", "auto_stories", "auto_stories", "auto_stories_off", "auto_towing", 
"auto_transmission", "autofps_select", "autofps_select", "automation", "autopause", "autoplay", "autorenew", "autorenew", 
"autostop", "av1", "av_timer", "av_timer", "avc", "avg_pace", "avg_time", "award_meal", 
"award_star", "azm", "baby_changing_station", "baby_changing_station", "back_hand", "back_hand", "back_to_tab", "background_dot_large", 
"background_dot_small", "background_grid_small", "background_replace", "backlight_high", "backlight_high_off", "backlight_low", "backpack", "backpack", 
"backspace", "backspace", "backup", "backup", "backup_table", "backup_table", "badge", "badge", 
"badge_critical_battery", "badminton", "bakery_dining", "bakery_dining", "balance", "balance", "balcony", "balcony", 
"ballot", "ballot", "bar_chart", "bar_chart", "bar_chart_4_bars", "bar_chart_off", "barcode", "barcode_reader", 
"barcode_reader", "barcode_scanner", "barefoot", "batch_prediction", "batch_prediction", "bath_bedrock", "bath_outdoor", "bath_private", 
"bath_public_large", "bath_soak", "bathroom", "bathroom", "bathtub", "bathtub", "battery_0_bar", "battery_0_bar", 
"battery_1_bar", "battery_1_bar", "battery_20", "battery_2_bar", "battery_2_bar", "battery_30", "battery_3_bar", "battery_3_bar", 
"battery_4_bar", "battery_4_bar", "battery_50", "battery_5_bar", "battery_5_bar", "battery_60", "battery_6_bar", "battery_6_bar", 
"battery_80", "battery_90", "battery_alert", "battery_alert", "battery_android_0", "battery_android_1", "battery_android_2", "battery_android_3", 
"battery_android_4", "battery_android_5", "battery_android_6", "battery_android_alert", "battery_android_bolt", "battery_android_frame_1", "battery_android_frame_2", "battery_android_frame_3", 
"battery_android_frame_4", "battery_android_frame_5", "battery_android_frame_6", "battery_android_frame_alert", "battery_android_frame_bolt", "battery_android_frame_full", "battery_android_frame_plus", "battery_android_frame_question", 
"battery_android_frame_share", "battery_android_frame_shield", "battery_android_full", "battery_android_plus", "battery_android_question", "battery_android_share", "battery_android_shield", "battery_change", 
"battery_charging_20", "battery_charging_20", "battery_charging_30", "battery_charging_30", "battery_charging_50", "battery_charging_50", "battery_charging_60", "battery_charging_60", 
"battery_charging_80", "battery_charging_80", "battery_charging_90", "battery_charging_90", "battery_charging_full", "battery_charging_full", "battery_error", "battery_full", 
"battery_full", "battery_full_alt", "battery_horiz_000", "battery_horiz_050", "battery_horiz_075", "battery_low", "battery_plus", "battery_profile", 
"battery_saver", "battery_saver", "battery_share", "battery_status_good", "battery_std", "battery_unknown", "battery_unknown", "battery_very_low", 
"beach_access", "beach_access", "bed", "bed", "bedroom_baby", "bedroom_baby", "bedroom_child", "bedroom_child", 
"bedroom_parent", "bedroom_parent", "bedtime", "bedtime", "bedtime_off", "bedtime_off", "beenhere", "beenhere", 
"beer_meal", "bento", "bento", "bia", "bid_landscape", "bid_landscape_disabled", "bigtop_updates", "bike_dock", 
"bike_lane", "bike_scooter", "bike_scooter", "biotech", "biotech", "blanket", "blender", "blender", 
"blind", "blind", "blinds", "blinds", "blinds_closed", "blinds_closed", "block", "block", 
"block_flipped", "blood_pressure", "bloodtype", "bloodtype", "bluetooth", "bluetooth", "bluetooth_audio", "bluetooth_connected", 
"bluetooth_connected", "bluetooth_disabled", "bluetooth_disabled", "bluetooth_drive", "bluetooth_drive", "bluetooth_searching", "bluetooth_searching", "blur_circular", 
"blur_circular", "blur_linear", "blur_linear", "blur_medium", "blur_off", "blur_off", "blur_on", "blur_on", 
"blur_short", "boat_bus", "boat_railway", "body_fat", "body_system", "bolt", "bolt", "bomb", 
"book", "book", "book_2", "book_3", "book_4", "book_5", "book_6", "book_online", 
"book_ribbon", "bookmark", "bookmark", "bookmark_add", "bookmark_add", "bookmark_added", "bookmark_added", "bookmark_bag", 
"bookmark_border", "bookmark_check", "bookmark_flag", "bookmark_heart", "bookmark_manager", "bookmark_remove", "bookmark_remove", "bookmark_star", 
"bookmarks", "bookmarks", "books_movies_and_music", "border_all", "border_all", "border_bottom", "border_bottom", "border_clear", 
"border_clear", "border_color", "border_color", "border_horizontal", "border_horizontal", "border_inner", "border_inner", "border_left", 
"border_left", "border_outer", "border_outer", "border_right", "border_right", "border_style", "border_style", "border_top", 
"border_top", "border_vertical", "border_vertical", "borg", "bottom_app_bar", "bottom_drawer", "bottom_navigation", "bottom_panel_close", 
"bottom_panel_open", "bottom_right_click", "bottom_sheets", "box", "box_add", "box_edit", "boy", "boy", 
"brand_awareness", "brand_family", "branding_watermark", "branding_watermark", "breakfast_dining", "breakfast_dining", "breaking_news", "breaking_news_alt_1", 
"breastfeeding", "brick", "briefcase_meal", "brightness_1", "brightness_1", "brightness_2", "brightness_2", "brightness_3", 
"brightness_3", "brightness_4", "brightness_4", "brightness_5", "brightness_5", "brightness_6", "brightness_6", "brightness_7", 
"brightness_7", "brightness_alert", "brightness_auto", "brightness_auto", "brightness_empty", "brightness_high", "brightness_low", "brightness_medium", 
"brightness_medium", "bring_your_own_ip", "broadcast_on_home", "broadcast_on_home", "broadcast_on_personal", "broadcast_on_personal", "broken_image", "broken_image", 
"browse", "browse_activity", "browse_gallery", "browse_gallery", "browser_not_supported", "browser_updated", "browser_updated", "brunch_dining", 
"brunch_dining", "brush", "brush", "bubble", "bubble_chart", "bubble_chart", "bubbles", "bucket_check", 
"bug_report", "bug_report", "build", "build", "build_circle", "build_circle", "bungalow", "bungalow", 
"burst_mode", "burst_mode", "bus_alert", "bus_alert", "bus_railway", "business", "business_center", "business_center", 
"business_chip", "business_messages", "buttons_alt", "cabin", "cabin", "cable", "cable", "cable_car", 
"cached", "cached", "cadence", "cake", "cake", "cake_add", "calculate", "calculate", 
"calendar_add_on", "calendar_apps_script", "calendar_check", "calendar_clock", "calendar_lock", "calendar_meal", "calendar_meal_2", "calendar_month", 
"calendar_month", "calendar_today", "calendar_today", "calendar_view_day", "calendar_view_day", "calendar_view_month", "calendar_view_month", "calendar_view_week", 
"calendar_view_week", "call", "call", "call_end", "call_end", "call_log", "call_made", "call_made", 
"call_merge", "call_merge", "call_missed", "call_missed", "call_missed_outgoing", "call_missed_outgoing", "call_quality", "call_received", 
"call_received", "call_split", "call_split", "call_to_action", "call_to_action", "camera", "camera", "camera_alt", 
"camera_enhance", "camera_front", "camera_indoor", "camera_indoor", "camera_outdoor", "camera_outdoor", "camera_rear", "camera_roll", 
"camera_roll", "camera_video", "cameraswitch", "cameraswitch", "campaign", "campaign", "camping", "cancel", 
"cancel", "cancel_presentation", "cancel_presentation", "cancel_schedule_send", "cancel_schedule_send", "candle", "candlestick_chart", "candlestick_chart", 
"cannabis", "captive_portal", "capture", "car_crash", "car_crash", "car_defrost_left", "car_defrost_low_left", "car_defrost_low_right", 
"car_defrost_mid_left", "car_defrost_mid_low_left", "car_defrost_mid_low_right", "car_defrost_mid_right", "car_defrost_right", "car_fan_low_left", "car_fan_low_mid_left", "car_fan_low_right", 
"car_fan_mid_left", "car_fan_mid_low_right", "car_fan_mid_right", "car_fan_recirculate", "car_gear", "car_lock", "car_mirror_heat", "car_rental", 
"car_rental", "car_repair", "car_repair", "car_tag", "card_giftcard", "card_membership", "card_membership", "card_travel", 
"card_travel", "cardio_load", "cardiology", "cards", "cards_star", "carpenter", "carpenter", "carry_on_bag", 
"carry_on_bag_checked", "carry_on_bag_inactive", "carry_on_bag_question", "cases", "cases", "casino", "casino", "cast", 
"cast", "cast_connected", "cast_connected", "cast_for_education", "cast_for_education", "cast_pause", "cast_warning", "castle", 
"castle", "catching_pokemon", "category", "category", "category_search", "celebration", "celebration", "cell_merge", 
"cell_tower", "cell_tower", "cell_wifi", "cell_wifi", "center_focus_strong", "center_focus_strong", "center_focus_weak", "center_focus_weak", 
"chair", "chair", "chair_alt", "chair_alt", "chair_counter", "chair_fireplace", "chair_umbrella", "chalet", 
"chalet", "change_circle", "change_circle", "change_history", "change_history", "charger", "charging_station", "chart_data", 
"chat", "chat", "chat_add_on", "chat_apps_script", "chat_bubble", "chat_bubble", "chat_bubble_outline", "chat_dashed", 
"chat_error", "chat_info", "chat_paste_go", "chat_paste_go_2", "check", "check", "check_box", "check_box", 
"check_box_outline_blank", "check_box_outline_blank", "check_circle", "check_circle", "check_circle_outline", "check_circle_unread", "check_in_out", "check_indeterminate_small", 
"check_small", "checkbook", "checked_bag", "checked_bag_question", "checklist", "checklist", "checklist_rtl", "checklist_rtl", 
"checkroom", "checkroom", "cheer", "chef_hat", "chess", "chess_bishop", "chess_bishop_2", "chess_king", 
"chess_king_2", "chess_knight", "chess_pawn", "chess_pawn_2", "chess_queen", "chess_rook", "chevron_backward", "chevron_forward", 
"chevron_left", "chevron_left", "chevron_right", "chevron_right", "child_care", "child_care", "child_friendly", "child_friendly", 
"child_hat", "chip_extraction", "chips", "chrome_reader_mode", "chrome_reader_mode", "chromecast_2", "chromecast_device", "chronic", 
"church", "church", "cinematic_blur", "circle", "circle", "circle_notifications", "circle_notifications", "circles", 
"circles_ext", "clarify", "class", "clean_hands", "clean_hands", "cleaning", "cleaning_bucket", "cleaning_services", 
"cleaning_services", "clear", "clear_all", "clear_all", "clear_day", "climate_mini_split", "clinical_notes", "clock_arrow_down", 
"clock_arrow_up", "clock_loader_10", "clock_loader_20", "clock_loader_40", "clock_loader_60", "clock_loader_80", "clock_loader_90", "close", 
"close", "close_fullscreen", "close_fullscreen", "close_small", "closed_caption", "closed_caption", "closed_caption_add", "closed_caption_disabled", 
"closed_caption_disabled", "closed_caption_off", "cloud", "cloud", "cloud_alert", "cloud_circle", "cloud_circle", "cloud_done", 
"cloud_done", "cloud_download", "cloud_download", "cloud_lock", "cloud_off", "cloud_off", "cloud_queue", "cloud_sync", 
"cloud_sync", "cloud_upload", "cloud_upload", "cloudy_snowing", "co2", "co2", "co_present", "co_present", 
"code", "code", "code_blocks", "code_off", "code_off", "coffee", "coffee", "coffee_maker", 
"coffee_maker", "cognition", "cognition_2", "collapse_all", "collapse_content", "collections", "collections_bookmark", "collections_bookmark", 
"color_lens", "colorize", "colorize", "colors", "combine_columns", "comedy_mask", "comic_bubble", "comment", 
"comment", "comment_bank", "comment_bank", "comments_disabled", "comments_disabled", "commit", "commit", "communication", 
"communities", "commute", "commute", "compare", "compare", "compare_arrows", "compare_arrows", "compass_calibration", 
"compass_calibration", "component_exchange", "compost", "compost", "compress", "compress", "computer", "computer", 
"computer_arrow_up", "computer_cancel", "concierge", "conditions", "confirmation_number", "confirmation_number", "congenital", "connect_without_contact", 
"connect_without_contact", "connected_tv", "connected_tv", "connecting_airports", "connecting_airports", "construction", "construction", "contact_emergency", 
"contact_emergency", "contact_mail", "contact_mail", "contact_page", "contact_page", "contact_phone", "contact_phone", "contact_support", 
"contact_support", "contactless", "contactless", "contactless_off", "contacts", "contacts", "contacts_product", "content_copy", 
"content_copy", "content_cut", "content_cut", "content_paste", "content_paste", "content_paste_go", "content_paste_go", "content_paste_off", 
"content_paste_off", "content_paste_search", "content_paste_search", "contextual_token", "contextual_token_add", "contract", "contract_delete", "contract_edit", 
"contrast", "contrast", "contrast_circle", "contrast_rtl_off", "contrast_square", "control_camera", "control_camera", "control_point", 
"control_point_duplicate", "control_point_duplicate", "controller_gen", "conversation", "conversion_path", "conversion_path_off", "convert_to_text", "conveyor_belt", 
"conveyor_belt", "cookie", "cookie", "cookie_off", "cooking", "cool_to_dry", "copy_all", "copy_all", 
"copyright", "copyright", "coronavirus", "coronavirus", "corporate_fare", "corporate_fare", "cottage", "cottage", 
"counter_0", "counter_1", "counter_2", "counter_3", "counter_4", "counter_5", "counter_6", "counter_7", 
"counter_8", "counter_9", "countertops", "countertops", "create", "create_new_folder", "create_new_folder", "credit_card", 
"credit_card", "credit_card_clock", "credit_card_gear", "credit_card_heart", "credit_card_off", "credit_card_off", "credit_score", "credit_score", 
"crib", "crib", "crisis_alert", "crisis_alert", "crop", "crop", "crop_16_9", "crop_16_9", 
"crop_3_2", "crop_3_2", "crop_5_4", "crop_5_4", "crop_7_5", "crop_7_5", "crop_9_16", "crop_din", 
"crop_free", "crop_free", "crop_landscape", "crop_landscape", "crop_original", "crop_portrait", "crop_portrait", "crop_rotate", 
"crop_rotate", "crop_square", "crop_square", "crossword", "crowdsource", "crown", "cruelty_free", "cruelty_free", 
"css", "css", "csv", "currency_bitcoin", "currency_bitcoin", "currency_exchange", "currency_exchange", "currency_franc", 
"currency_franc", "currency_lira", "currency_lira", "currency_pound", "currency_pound", "currency_ruble", "currency_ruble", "currency_rupee", 
"currency_rupee", "currency_rupee_circle", "currency_yen", "currency_yen", "currency_yuan", "currency_yuan", "curtains", "curtains", 
"curtains_closed", "curtains_closed", "custom_typography", "cycle", "cyclone", "cyclone", "dangerous", "dangerous", 
"dark_mode", "dark_mode", "dashboard", "dashboard", "dashboard_2", "dashboard_customize", "dashboard_customize", "data_alert", 
"data_array", "data_array", "data_check", "data_exploration", "data_exploration", "data_info_alert", "data_loss_prevention", "data_object", 
"data_object", "data_saver_off", "data_saver_on", "data_saver_on", "data_table", "data_thresholding", "data_thresholding", "data_usage", 
"data_usage", "database", "database_off", "database_search", "database_upload", "dataset", "dataset", "dataset_linked", 
"dataset_linked", "date_range", "date_range", "deblur", "deblur", "deceased", "decimal_decrease", "decimal_increase", 
"deck", "deck", "dehaze", "dehaze", "delete", "delete", "delete_forever", "delete_forever", 
"delete_history", "delete_outline", "delete_sweep", "delete_sweep", "delivery_dining", "delivery_truck_bolt", "delivery_truck_speed", "demography", 
"density_large", "density_large", "density_medium", "density_medium", "density_small", "density_small", "dentistry", "departure_board", 
"departure_board", "deployed_code", "deployed_code_account", "deployed_code_alert", "deployed_code_history", "deployed_code_update", "dermatology", "description", 
"description", "deselect", "deselect", "design_services", "design_services", "desk", "desk", "deskphone", 
"desktop_access_disabled", "desktop_access_disabled", "desktop_cloud", "desktop_cloud_stack", "desktop_landscape", "desktop_landscape_add", "desktop_mac", "desktop_mac", 
"desktop_portrait", "desktop_windows", "desktop_windows", "destruction", "details", "details", "detection_and_zone", "detector", 
"detector_alarm", "detector_battery", "detector_co", "detector_offline", "detector_smoke", "detector_status", "developer_board", "developer_board", 
"developer_board_off", "developer_board_off", "developer_guide", "developer_mode", "developer_mode_tv", "device_band", "device_hub", "device_hub", 
"device_thermostat", "device_thermostat", "device_unknown", "devices", "devices", "devices_fold", "devices_fold", "devices_fold_2", 
"devices_off", "devices_other", "devices_other", "devices_wearables", "dew_point", "dew_point", "diagnosis", "diagonal_line", 
"dialer_sip", "dialer_sip", "dialogs", "dialpad", "dialpad", "diamond", "diamond", "diamond_shine", 
"dictionary", "difference", "difference", "digital_out_of_home", "digital_wellbeing", "dine_heart", "dine_in", "dine_lamp", 
"dining", "dining", "dinner_dining", "dinner_dining", "directions", "directions", "directions_alt", "directions_alt_off", 
"directions_bike", "directions_bike", "directions_boat", "directions_boat", "directions_boat_filled", "directions_bus", "directions_bus", "directions_bus_filled", 
"directions_car", "directions_car", "directions_car_filled", "directions_off", "directions_off", "directions_railway", "directions_railway", "directions_railway_2", 
"directions_railway_filled", "directions_run", "directions_run", "directions_subway", "directions_subway", "directions_subway_filled", "directions_transit", "directions_transit_filled", 
"directions_walk", "directions_walk", "directory_sync", "dirty_lens", "dirty_lens", "disabled_by_default", "disabled_by_default", "disabled_visible", 
"disabled_visible", "disc_full", "disc_full", "discount", "discover_tune", "dishwasher", "dishwasher_gen", "display_external_input", 
"display_settings", "display_settings", "distance", "diversity_1", "diversity_1", "diversity_2", "diversity_2", "diversity_3", 
"diversity_3", "diversity_4", "dns", "dns", "do_disturb", "do_disturb_alt", "do_disturb_off", "do_disturb_on", 
"do_not_disturb", "do_not_disturb_alt", "do_not_disturb_off", "do_not_disturb_off", "do_not_disturb_on", "do_not_disturb_on", "do_not_disturb_on_total_silence", "do_not_disturb_on_total_silence", 
"do_not_step", "do_not_step", "do_not_touch", "do_not_touch", "dock", "dock_to_bottom", "dock_to_left", "dock_to_right", 
"docs", "docs_add_on", "docs_apps_script", "document_scanner", "document_scanner", "document_search", "domain", "domain", 
"domain_add", "domain_add", "domain_disabled", "domain_disabled", "domain_verification", "domain_verification", "domain_verification_off", "domino_mask", 
"done", "done_all", "done_all", "done_outline", "done_outline", "donut_large", "donut_large", "donut_small", 
"donut_small", "door_back", "door_back", "door_front", "door_front", "door_open", "door_sensor", "door_sliding", 
"door_sliding", "doorbell", "doorbell", "doorbell_3p", "doorbell_chime", "double_arrow", "double_arrow", "downhill_skiing", 
"downhill_skiing", "download", "download", "download_2", "download_done", "download_done", "download_for_offline", "download_for_offline", 
"downloading", "downloading", "draft", "draft_orders", "drafts", "drafts", "drag_click", "drag_handle", 
"drag_handle", "drag_indicator", "drag_indicator", "drag_pan", "draw", "draw", "draw_abstract", "draw_collage", 
"dresser", "drive_eta", "drive_export", "drive_file_move", "drive_file_move", "drive_file_move_outline", "drive_file_move_rtl", "drive_file_rename_outline", 
"drive_folder_upload", "drive_folder_upload", "drone", "drone_2", "dropdown", "dropper_eye", "dry", "dry", 
"dry_cleaning", "dry_cleaning", "dual_screen", "duo", "duo", "dvr", "dvr", "dynamic_feed", 
"dynamic_feed", "dynamic_form", "dynamic_form", "e911_avatar", "e911_emergency", "e_mobiledata", "e_mobiledata", "e_mobiledata_badge", 
"ear_sound", "earbud_case", "earbud_left", "earbud_right", "earbuds", "earbuds", "earbuds_2", "earbuds_battery", 
"earbuds_battery", "early_on", "earthquake", "east", "east", "ecg", "ecg_heart", "eco", 
"eda", "edgesensor_high", "edgesensor_low", "edit", "edit", "edit_arrow_down", "edit_arrow_up", "edit_attributes", 
"edit_attributes", "edit_audio", "edit_calendar", "edit_calendar", "edit_document", "edit_document", "edit_location", "edit_location", 
"edit_location_alt", "edit_location_alt", "edit_note", "edit_note", "edit_notifications", "edit_notifications", "edit_off", "edit_off", 
"edit_road", "edit_road", "edit_square", "edit_square", "editor_choice", "egg", "egg", "egg_alt", 
"egg_alt", "eject", "eject", "elderly", "elderly", "elderly_woman", "elderly_woman", "electric_bike", 
"electric_bike", "electric_bolt", "electric_bolt", "electric_car", "electric_car", "electric_meter", "electric_meter", "electric_moped", 
"electric_moped", "electric_rickshaw", "electric_rickshaw", "electric_scooter", "electric_scooter", "electrical_services", "electrical_services", "elevation", 
"elevator", "elevator", "email", "emergency", "emergency", "emergency_heat", "emergency_heat_2", "emergency_home", 
"emergency_recording", "emergency_recording", "emergency_share", "emergency_share", "emergency_share_off", "emoji_emotions", "emoji_events", "emoji_food_beverage", 
"emoji_food_beverage", "emoji_language", "emoji_nature", "emoji_nature", "emoji_objects", "emoji_objects", "emoji_people", "emoji_people", 
"emoji_symbols", "emoji_symbols", "emoji_transportation", "emoji_transportation", "emoticon", "empty_dashboard", "enable", "encrypted", 
"encrypted_add", "encrypted_add_circle", "encrypted_minus_circle", "encrypted_off", "endocrinology", "energy", "energy_program_saving", "energy_program_time_used", 
"energy_savings_leaf", "energy_savings_leaf", "engineering", "engineering", "enhanced_encryption", "enhanced_encryption", "ent", "enterprise", 
"enterprise_off", "equal", "equalizer", "equalizer", "eraser_size_1", "eraser_size_2", "eraser_size_3", "eraser_size_4", 
"eraser_size_5", "error", "error", "error_med", "error_outline", "escalator", "escalator", "escalator_warning", 
"escalator_warning", "euro", "euro", "euro_symbol", "euro_symbol", "ev_mobiledata_badge", "ev_shadow", "ev_shadow_add", 
"ev_shadow_minus", "ev_station", "ev_station", "event", "event", "event_available", "event_available", "event_busy", 
"event_busy", "event_list", "event_note", "event_note", "event_repeat", "event_repeat", "event_seat", "event_seat", 
"event_upcoming", "exclamation", "exercise", "exit_to_app", "exit_to_app", "expand", "expand", "expand_all", 
"expand_circle_down", "expand_circle_down", "expand_circle_right", "expand_circle_up", "expand_content", "expand_less", "expand_more", "expansion_panels", 
"experiment", "explicit", "explicit", "explore", "explore", "explore_nearby", "explore_off", "explore_off", 
"explosion", "export_notes", "exposure", "exposure", "exposure_neg_1", "exposure_neg_1", "exposure_neg_2", "exposure_neg_2", 
"exposure_plus_1", "exposure_plus_1", "exposure_plus_2", "exposure_plus_2", "exposure_zero", "exposure_zero", "extension", "extension", 
"extension_off", "extension_off", "eye_tracking", "eyeglasses", "eyeglasses_2", "eyeglasses_2_sound", "face", "face", 
"face_2", "face_2", "face_3", "face_3", "face_4", "face_4", "face_5", "face_5", 
"face_6", "face_6", "face_down", "face_left", "face_nod", "face_retouching_natural", "face_retouching_off", "face_retouching_off", 
"face_right", "face_shake", "face_unlock", "face_up", "fact_check", "fact_check", "factory", "factory", 
"falling", "familiar_face_and_zone", "family_group", "family_history", "family_home", "family_link", "family_restroom", "family_restroom", 
"family_star", "fan_focus", "fan_indirect", "farsight_digital", "fast_forward", "fast_forward", "fast_rewind", "fast_rewind", 
"fastfood", "fastfood", "faucet", "favorite", "favorite", "favorite_border", "fax", "fax", 
"feature_search", "featured_play_list", "featured_play_list", "featured_seasonal_and_gifts", "featured_video", "featured_video", "feed", "feedback", 
"feedback", "female", "female", "femur", "femur_alt", "fence", "fence", "fertile", 
"festival", "festival", "fiber_dvr", "fiber_dvr", "fiber_manual_record", "fiber_manual_record", "fiber_new", "fiber_new", 
"fiber_pin", "fiber_pin", "fiber_smart_record", "fiber_smart_record", "file_copy", "file_copy", "file_copy_off", "file_download", 
"file_download_done", "file_download_off", "file_download_off", "file_export", "file_json", "file_map", "file_map_stack", "file_open", 
"file_open", "file_png", "file_present", "file_present", "file_save", "file_save_off", "file_upload", "file_upload_off", 
"file_upload_off", "files", "filter", "filter", "filter_1", "filter_1", "filter_2", "filter_2", 
"filter_3", "filter_3", "filter_4", "filter_4", "filter_5", "filter_5", "filter_6", "filter_6", 
"filter_7", "filter_7", "filter_8", "filter_8", "filter_9", "filter_9", "filter_9_plus", "filter_9_plus", 
"filter_alt", "filter_alt", "filter_alt_off", "filter_alt_off", "filter_arrow_right", "filter_b_and_w", "filter_b_and_w", "filter_center_focus", 
"filter_center_focus", "filter_drama", "filter_drama", "filter_frames", "filter_frames", "filter_hdr", "filter_list", "filter_list", 
"filter_list_alt", "filter_list_off", "filter_list_off", "filter_none", "filter_none", "filter_retrolux", "filter_tilt_shift", "filter_tilt_shift", 
"filter_vintage", "filter_vintage", "finance", "finance_chip", "finance_mode", "find_in_page", "find_in_page", "find_replace", 
"find_replace", "fingerprint", "fingerprint", "fingerprint_off", "fire_extinguisher", "fire_extinguisher", "fire_hydrant", "fire_hydrant_alt", 
"fire_truck", "fire_truck", "fireplace", "fireplace", "first_page", "first_page", "fit_page", "fit_page_height", 
"fit_page_width", "fit_screen", "fit_screen", "fit_width", "fitbit", "fitness_center", "fitness_center", "fitness_tracker", 
"fitness_trackers", "flag", "flag", "flag_2", "flag_check", "flag_circle", "flag_circle", "flaky", 
"flaky", "flare", "flare", "flash_auto", "flash_auto", "flash_off", "flash_off", "flash_on", 
"flash_on", "flashlight_off", "flashlight_off", "flashlight_on", "flashlight_on", "flatware", "flatware", "flex_direction", 
"flex_no_wrap", "flex_wrap", "flight", "flight", "flight_class", "flight_class", "flight_land", "flight_land", 
"flight_takeoff", "flight_takeoff", "flights_and_hotels", "flip", "flip", "flip_camera_android", "flip_camera_android", "flip_camera_ios", 
"flip_camera_ios", "flip_to_back", "flip_to_back", "flip_to_front", "flip_to_front", "float_landscape_2", "float_portrait_2", "flood", 
"flood", "floor", "floor_lamp", "flowchart", "flowsheet", "fluid", "fluid_balance", "fluid_med", 
"fluorescent", "fluorescent", "flutter", "flutter_dash", "flutter_dash", "flyover", "fmd_bad", "fmd_bad", 
"fmd_good", "foggy", "foggy", "folded_hands", "folder", "folder", "folder_check", "folder_check_2", 
"folder_code", "folder_copy", "folder_copy", "folder_data", "folder_delete", "folder_delete", "folder_eye", "folder_info", 
"folder_limited", "folder_managed", "folder_match", "folder_off", "folder_off", "folder_open", "folder_open", "folder_shared", 
"folder_shared", "folder_special", "folder_special", "folder_supervised", "folder_zip", "folder_zip", "follow_the_signs", "follow_the_signs", 
"font_download", "font_download", "font_download_off", "font_download_off", "food_bank", "food_bank", "foot_bones", "footprint", 
"for_you", "forest", "forest", "fork_left", "fork_left", "fork_right", "fork_right", "fork_spoon", 
"forklift", "forklift", "format_align_center", "format_align_center", "format_align_justify", "format_align_justify", "format_align_left", "format_align_left", 
"format_align_right", "format_align_right", "format_bold", "format_bold", "format_clear", "format_clear", "format_color_fill", "format_color_fill", 
"format_color_reset", "format_color_reset", "format_color_text", "format_color_text", "format_h1", "format_h2", "format_h3", "format_h4", 
"format_h5", "format_h6", "format_image_left", "format_image_right", "format_indent_decrease", "format_indent_decrease", "format_indent_increase", "format_indent_increase", 
"format_ink_highlighter", "format_italic", "format_italic", "format_letter_spacing", "format_letter_spacing_2", "format_letter_spacing_standard", "format_letter_spacing_wide", "format_letter_spacing_wider", 
"format_line_spacing", "format_line_spacing", "format_list_bulleted", "format_list_bulleted", "format_list_bulleted_add", "format_list_bulleted_add", "format_list_numbered", "format_list_numbered", 
"format_list_numbered_rtl", "format_list_numbered_rtl", "format_overline", "format_overline", "format_paint", "format_paint", "format_paragraph", "format_quote", 
"format_quote", "format_quote_off", "format_shapes", "format_shapes", "format_size", "format_size", "format_strikethrough", "format_strikethrough", 
"format_text_clip", "format_text_overflow", "format_text_wrap", "format_textdirection_l_to_r", "format_textdirection_l_to_r", "format_textdirection_r_to_l", "format_textdirection_r_to_l", "format_textdirection_vertical", 
"format_underlined", "format_underlined", "format_underlined_squiggle", "forms_add_on", "forms_apps_script", "fort", "fort", "forum", 
"forum", "forward", "forward", "forward_10", "forward_10", "forward_30", "forward_30", "forward_5", 
"forward_5", "forward_circle", "forward_media", "forward_to_inbox", "forward_to_inbox", "foundation", "foundation", "fragrance", 
"frame_bug", "frame_exclamation", "frame_inspect", "frame_person", "frame_person_mic", "frame_person_off", "frame_reload", "frame_source", 
"free_breakfast", "free_cancellation", "free_cancellation", "front_hand", "front_hand", "front_loader", "front_loader", "full_coverage", 
"full_hd", "full_stacked_bar_chart", "fullscreen", "fullscreen", "fullscreen_exit", "fullscreen_exit", "fullscreen_portrait", "function", 
"functions", "functions", "funicular", "g_mobiledata", "g_mobiledata", "g_mobiledata_badge", "g_translate", "g_translate", 
"gallery_thumbnail", "gamepad", "gamepad", "games", "garage", "garage", "garage_check", "garage_door", 
"garage_home", "garage_money", "garden_cart", "gas_meter", "gas_meter", "gastroenterology", "gate", "gavel", 
"gavel", "general_device", "generating_tokens", "genetics", "genres", "gesture", "gesture", "gesture_select", 
"get_app", "gif", "gif", "gif_2", "gif_box", "gif_box", "girl", "girl", 
"gite", "gite", "glass_cup", "globe", "globe_asia", "globe_book", "globe_location_pin", "globe_uk", 
"glucose", "glyphs", "go_to_line", "golf_course", "golf_course", "gondola_lift", "google_home_devices", "google_tv_remote", 
"google_wifi", "gpp_bad", "gpp_bad", "gpp_good", "gpp_maybe", "gpp_maybe", "gps_fixed", "gps_not_fixed", 
"gps_off", "grade", "gradient", "gradient", "grading", "grading", "grain", "grain", 
"graph_1", "graph_2", "graph_3", "graph_4", "graph_5", "graph_6", "graph_7", "graphic_eq", 
"graphic_eq", "grass", "grass", "grid_3x3", "grid_3x3", "grid_3x3_off", "grid_4x4", "grid_4x4", 
"grid_goldenratio", "grid_goldenratio", "grid_guides", "grid_off", "grid_off", "grid_on", "grid_on", "grid_view", 
"grid_view", "grocery", "group", "group", "group_add", "group_add", "group_off", "group_off", 
"group_remove", "group_remove", "group_search", "group_work", "group_work", "grouped_bar_chart", "groups", "groups", 
"groups_2", "groups_2", "groups_3", "groups_3", "guardian", "gynecology", "h_mobiledata", "h_mobiledata", 
"h_mobiledata_badge", "h_plus_mobiledata", "h_plus_mobiledata", "h_plus_mobiledata_badge", "hail", "hail", "hallway", "hanami_dango", 
"hand_bones", "hand_gesture", "hand_gesture_off", "hand_meal", "hand_package", "handheld_controller", "handshake", "handshake", 
"handyman", "handyman", "hangout_video", "hangout_video_off", "hard_disk", "hard_drive", "hard_drive_2", "hardware", 
"hardware", "hd", "hd", "hdr_auto", "hdr_auto", "hdr_auto_select", "hdr_auto_select", "hdr_enhanced_select", 
"hdr_enhanced_select", "hdr_off", "hdr_off", "hdr_off_select", "hdr_off_select", "hdr_on", "hdr_on", "hdr_on_select", 
"hdr_on_select", "hdr_plus", "hdr_plus", "hdr_plus_off", "hdr_strong", "hdr_strong", "hdr_weak", "hdr_weak", 
"head_mounted_device", "headphones", "headphones", "headphones_battery", "headphones_battery", "headset", "headset_mic", "headset_mic", 
"headset_off", "headset_off", "healing", "healing", "health_and_beauty", "health_and_safety", "health_and_safety", "health_cross", 
"health_metrics", "heap_snapshot_large", "heap_snapshot_multiple", "heap_snapshot_thumbnail", "hearing", "hearing", "hearing_aid", "hearing_aid_disabled", 
"hearing_aid_disabled_left", "hearing_aid_left", "hearing_disabled", "hearing_disabled", "heart_broken", "heart_broken", "heart_check", "heart_minus", 
"heart_plus", "heart_smile", "heat", "heat_pump", "heat_pump", "heat_pump_balance", "height", "height", 
"helicopter", "help", "help", "help_center", "help_center", "help_clinic", "help_outline", "hematology", 
"hevc", "hevc", "hexagon", "hexagon", "hide", "hide_image", "hide_image", "hide_source", 
"hide_source", "high_chair", "high_density", "high_quality", "high_quality", "high_res", "highlight", "highlight", 
"highlight_alt", "highlight_keyboard_focus", "highlight_mouse_cursor", "highlight_off", "highlight_text_cursor", "highlighter_size_1", "highlighter_size_2", "highlighter_size_3", 
"highlighter_size_4", "highlighter_size_5", "hiking", "hiking", "history", "history", "history_2", "history_edu", 
"history_edu", "history_off", "history_toggle_off", "history_toggle_off", "hive", "hive", "hls", "hls", 
"hls_off", "hls_off", "holiday_village", "holiday_village", "home", "home", "home_and_garden", "home_app_logo", 
"home_filled", "home_health", "home_improvement_and_tools", "home_iot_device", "home_max", "home_max", "home_max_dots", "home_mini", 
"home_mini", "home_pin", "home_repair_service", "home_repair_service", "home_speaker", "home_storage", "home_work", "home_work", 
"horizontal_distribute", "horizontal_distribute", "horizontal_rule", "horizontal_rule", "horizontal_split", "horizontal_split", "host", "hot_tub", 
"hot_tub", "hotel", "hotel", "hotel_class", "hotel_class", "hourglass", "hourglass_arrow_down", "hourglass_arrow_up", 
"hourglass_bottom", "hourglass_bottom", "hourglass_disabled", "hourglass_disabled", "hourglass_empty", "hourglass_empty", "hourglass_full", "hourglass_pause", 
"hourglass_top", "hourglass_top", "house", "house", "house_siding", "house_siding", "house_with_shield", "houseboat", 
"houseboat", "household_supplies", "hov", "how_to_reg", "how_to_reg", "how_to_vote", "how_to_vote", "hr_resting", 
"html", "html", "http", "http", "https", "hub", "hub", "humerus", 
"humerus_alt", "humidity_high", "humidity_indoor", "humidity_low", "humidity_mid", "humidity_percentage", "hvac", "hvac", 
"hvac_max_defrost", "ice_skating", "ice_skating", "icecream", "icecream", "id_card", "identity_aware_proxy", "identity_platform", 
"ifl", "iframe", "iframe_off", "image", "image", "image_arrow_up", "image_aspect_ratio", "image_aspect_ratio", 
"image_inset", "image_not_supported", "image_search", "image_search", "imagesearch_roller", "imagesearch_roller", "imagesmode", "immunology", 
"import_contacts", "import_contacts", "import_export", "important_devices", "important_devices", "in_home_mode", "inactive_order", "inbox", 
"inbox", "inbox_customize", "inbox_text", "inbox_text_asterisk", "inbox_text_person", "inbox_text_share", "incomplete_circle", "incomplete_circle", 
"indeterminate_check_box", "indeterminate_check_box", "indeterminate_question_box", "info", "info", "info_i", "info_outline", "infrared", 
"ink_eraser", "ink_eraser_off", "ink_highlighter", "ink_highlighter_move", "ink_marker", "ink_pen", "ink_selection", "inpatient", 
"input", "input", "input_circle", "insert_chart", "insert_chart", "insert_chart_outlined", "insert_comment", "insert_drive_file", 
"insert_emoticon", "insert_invitation", "insert_link", "insert_page_break", "insert_page_break", "insert_photo", "insert_text", "insights", 
"install_desktop", "install_desktop", "install_mobile", "instant_mix", "integration_instructions", "integration_instructions", "interactive_space", "interests", 
"interests", "interpreter_mode", "interpreter_mode", "inventory", "inventory", "inventory_2", "inventory_2", "invert_colors", 
"invert_colors", "invert_colors_off", "invert_colors_off", "ios", "ios_share", "ios_share", "iron", "iron", 
"iso", "jamboard_kiosk", "japanese_curry", "japanese_flag", "javascript", "javascript", "join", "join_full", 
"join_inner", "join_inner", "join_left", "join_left", "join_right", "join_right", "joystick", "jump_to_element", 
"kanji_alcohol", "kayaking", "kayaking", "kebab_dining", "kebab_dining", "keep", "keep_off", "keep_public", 
"kettle", "key", "key", "key_off", "key_off", "key_vertical", "key_visualizer", "keyboard", 
"keyboard", "keyboard_alt", "keyboard_alt", "keyboard_arrow_down", "keyboard_arrow_down", "keyboard_arrow_left", "keyboard_arrow_left", "keyboard_arrow_right", 
"keyboard_arrow_right", "keyboard_arrow_up", "keyboard_arrow_up", "keyboard_backspace", "keyboard_backspace", "keyboard_capslock", "keyboard_capslock", "keyboard_capslock_badge", 
"keyboard_command_key", "keyboard_command_key", "keyboard_control_key", "keyboard_control_key", "keyboard_double_arrow_down", "keyboard_double_arrow_down", "keyboard_double_arrow_left", "keyboard_double_arrow_left", 
"keyboard_double_arrow_right", "keyboard_double_arrow_right", "keyboard_double_arrow_up", "keyboard_double_arrow_up", "keyboard_external_input", "keyboard_full", "keyboard_hide", "keyboard_hide", 
"keyboard_keys", "keyboard_lock", "keyboard_lock_off", "keyboard_off", "keyboard_onscreen", "keyboard_option_key", "keyboard_option_key", "keyboard_previous_language", 
"keyboard_return", "keyboard_return", "keyboard_tab", "keyboard_tab", "keyboard_tab_rtl", "keyboard_voice", "kid_star", "king_bed", 
"king_bed", "kitchen", "kitchen", "kitesurfing", "kitesurfing", "lab_panel", "lab_profile", "lab_research", 
"label", "label", "label_important", "label_important", "label_important_outline", "label_off", "label_off", "labs", 
"lan", "lan", "landscape", "landscape", "landscape_2", "landscape_2_edit", "landscape_2_off", "landslide", 
"landslide", "language", "language", "language_chinese_array", "language_chinese_cangjie", "language_chinese_dayi", "language_chinese_pinyin", "language_chinese_quick", 
"language_chinese_wubi", "language_french", "language_gb_english", "language_international", "language_japanese_kana", "language_korean_latin", "language_pinyin", "language_spanish", 
"language_us", "language_us_colemak", "language_us_dvorak", "laps", "laptop", "laptop_car", "laptop_chromebook", "laptop_chromebook", 
"laptop_mac", "laptop_mac", "laptop_windows", "laptop_windows", "lasso_select", "last_page", "last_page", "launch", 
"laundry", "layers", "layers", "layers_clear", "layers_clear", "lda", "leaderboard", "leaderboard", 
"leak_add", "leak_add", "leak_remove", "leak_remove", "left_click", "left_panel_close", "left_panel_open", "legend_toggle", 
"legend_toggle", "lens", "lens_blur", "lens_blur", "letter_switch", "library_add", "library_add", "library_add_check", 
"library_add_check", "library_books", "library_books", "library_music", "library_music", "license", "lift_to_talk", "light", 
"light", "light_group", "light_mode", "light_mode", "light_off", "lightbulb", "lightbulb", "lightbulb_2", 
"lightbulb_circle", "lightbulb_circle", "lightbulb_outline", "lightning_stand", "line_axis", "line_axis", "line_curve", "line_end", 
"line_end_arrow", "line_end_arrow_notch", "line_end_circle", "line_end_diamond", "line_end_square", "line_start", "line_start_arrow", "line_start_arrow_notch", 
"line_start_circle", "line_start_diamond", "line_start_square", "line_style", "line_style", "line_weight", "line_weight", "linear_scale", 
"linear_scale", "link", "link", "link_off", "link_off", "linked_camera", "linked_camera", "linked_services", 
"liquor", "liquor", "list", "list", "list_alt", "list_alt", "list_alt_add", "list_alt_check", 
"lists", "live_help", "live_help", "live_tv", "live_tv", "living", "living", "local_activity", 
"local_activity", "local_airport", "local_atm", "local_atm", "local_bar", "local_bar", "local_cafe", "local_cafe", 
"local_car_wash", "local_car_wash", "local_convenience_store", "local_convenience_store", "local_dining", "local_dining", "local_drink", "local_drink", 
"local_fire_department", "local_fire_department", "local_florist", "local_florist", "local_gas_station", "local_gas_station", "local_grocery_store", "local_hospital", 
"local_hospital", "local_hotel", "local_laundry_service", "local_laundry_service", "local_library", "local_library", "local_mall", "local_mall", 
"local_movies", "local_offer", "local_parking", "local_parking", "local_pharmacy", "local_pharmacy", "local_phone", "local_pizza", 
"local_pizza", "local_play", "local_police", "local_police", "local_post_office", "local_post_office", "local_printshop", "local_see", 
"local_see", "local_shipping", "local_shipping", "local_taxi", "local_taxi", "location_away", "location_chip", "location_city", 
"location_city", "location_disabled", "location_disabled", "location_home", "location_off", "location_off", "location_on", "location_on", 
"location_pin", "location_searching", "location_searching", "lock", "lock", "lock_clock", "lock_clock", "lock_open", 
"lock_open", "lock_open_circle", "lock_open_right", "lock_outline", "lock_person", "lock_person", "lock_reset", "lock_reset", 
"login", "login", "logo_dev", "logo_dev", "logout", "logout", "looks", "looks", 
"looks_3", "looks_3", "looks_4", "looks_4", "looks_5", "looks_5", "looks_6", "looks_6", 
"looks_one", "looks_one", "looks_two", "looks_two", "loop", "loupe", "loupe", "low_density", 
"low_priority", "low_priority", "lowercase", "loyalty", "loyalty", "lte_mobiledata", "lte_mobiledata", "lte_mobiledata_badge", 
"lte_plus_mobiledata", "lte_plus_mobiledata", "lte_plus_mobiledata_badge", "luggage", "luggage", "lunch_dining", "lunch_dining", "lyrics", 
"lyrics", "macro_auto", "macro_off", "macro_off", "magnification_large", "magnification_small", "magnify_docked", "magnify_fullscreen", 
"mail", "mail", "mail_asterisk", "mail_lock", "mail_lock", "mail_off", "mail_outline", "mail_shield", 
"male", "male", "man", "man", "man_2", "man_2", "man_3", "man_3", 
"man_4", "man_4", "manage_accounts", "manage_accounts", "manage_history", "manage_history", "manage_search", "manage_search", 
"manga", "manufacturing", "map", "map", "map_pin_heart", "map_pin_review", "map_search", "maps_home_work", 
"maps_ugc", "maps_ugc", "margin", "margin", "mark_as_unread", "mark_as_unread", "mark_chat_read", "mark_chat_read", 
"mark_chat_unread", "mark_chat_unread", "mark_email_read", "mark_email_read", "mark_email_unread", "mark_email_unread", "mark_unread_chat_alt", "mark_unread_chat_alt", 
"markdown", "markdown_copy", "markdown_paste", "markunread", "markunread_mailbox", "markunread_mailbox", "masked_transitions", "masked_transitions_add", 
"masks", "masks", "massage", "match_case", "match_case_off", "match_word", "matter", "maximize", 
"maximize", "meal_dinner", "meal_lunch", "measuring_tape", "media_bluetooth_off", "media_bluetooth_off", "media_bluetooth_on", "media_bluetooth_on", 
"media_link", "media_output", "media_output_off", "mediation", "mediation", "medical_information", "medical_information", "medical_mask", 
"medical_services", "medical_services", "medication", "medication", "medication_liquid", "medication_liquid", "meeting_room", "meeting_room", 
"memory", "memory", "memory_alt", "menstrual_health", "menu", "menu", "menu_book", "menu_book", 
"menu_book_2", "menu_open", "menu_open", "merge", "merge", "merge_type", "merge_type", "message", 
"metabolism", "metro", "mfg_nest_yale_lock", "mic", "mic", "mic_alert", "mic_double", "mic_external_off", 
"mic_external_off", "mic_external_on", "mic_external_on", "mic_none", "mic_off", "mic_off", "microbiology", "microwave", 
"microwave", "microwave_gen", "military_tech", "military_tech", "mimo", "mimo_disconnect", "mindfulness", "minimize", 
"minimize", "minor_crash", "minor_crash", "mintmark", "miscellaneous_services", "missed_video_call", "missed_video_call", "missing_controller", 
"mist", "mitre", "mixture_med", "mms", "mms", "mobile", "mobile_2", "mobile_3", 
"mobile_alert", "mobile_arrow_down", "mobile_arrow_right", "mobile_arrow_up_right", "mobile_block", "mobile_camera", "mobile_camera_front", "mobile_camera_rear", 
"mobile_cancel", "mobile_cast", "mobile_charge", "mobile_chat", "mobile_check", "mobile_code", "mobile_dots", "mobile_friendly", 
"mobile_gear", "mobile_hand", "mobile_hand_left", "mobile_hand_left_off", "mobile_hand_off", "mobile_info", "mobile_landscape", "mobile_layout", 
"mobile_lock_landscape", "mobile_lock_portrait", "mobile_loupe", "mobile_menu", "mobile_off", "mobile_off", "mobile_question", "mobile_rotate", 
"mobile_rotate_lock", "mobile_screen_share", "mobile_screensaver", "mobile_sensor_hi", "mobile_sensor_lo", "mobile_share", "mobile_share_stack", "mobile_sound", 
"mobile_sound_2", "mobile_sound_off", "mobile_speaker", "mobile_text", "mobile_text_2", "mobile_theft", "mobile_ticket", "mobile_vibrate", 
"mobile_wrench", "mobiledata_off", "mobiledata_off", "mode", "mode_comment", "mode_comment", "mode_cool", "mode_cool_off", 
"mode_dual", "mode_edit", "mode_edit_outline", "mode_fan", "mode_fan_off", "mode_fan_off", "mode_heat", "mode_heat_cool", 
"mode_heat_off", "mode_night", "mode_night", "mode_of_travel", "mode_of_travel", "mode_off_on", "mode_standby", "mode_standby", 
"model_training", "model_training", "modeling", "monetization_on", "money", "money", "money_bag", "money_off", 
"money_off", "money_off_csred", "money_range", "monitor", "monitor", "monitor_heart", "monitor_heart", "monitor_weight", 
"monitor_weight", "monitor_weight_gain", "monitor_weight_loss", "monitoring", "monochrome_photos", "monochrome_photos", "monorail", "mood", 
"mood", "mood_bad", "mood_bad", "moon_stars", "mop", "moped", "moped", "moped_package", 
"more", "more", "more_down", "more_horiz", "more_horiz", "more_time", "more_time", "more_up", 
"more_vert", "more_vert", "mosque", "mosque", "motion_blur", "motion_mode", "motion_photos_auto", "motion_photos_auto", 
"motion_photos_off", "motion_photos_on", "motion_photos_on", "motion_photos_pause", "motion_photos_paused", "motion_photos_paused", "motion_play", "motion_sensor_active", 
"motion_sensor_alert", "motion_sensor_idle", "motion_sensor_urgent", "motorcycle", "mountain_flag", "mountain_steam", "mouse", "mouse", 
"mouse_lock", "mouse_lock_off", "move", "move_down", "move_down", "move_group", "move_item", "move_location", 
"move_selection_down", "move_selection_left", "move_selection_right", "move_selection_up", "move_to_inbox", "move_to_inbox", "move_up", "move_up", 
"moved_location", "movie", "movie", "movie_creation", "movie_edit", "movie_edit", "movie_filter", "movie_info", 
"movie_off", "movie_speaker", "moving", "moving", "moving_beds", "moving_ministry", "mp", "mp", 
"multicooker", "multiline_chart", "multiline_chart", "multimodal_hand_eye", "multiple_airports", "multiple_stop", "multiple_stop", "museum", 
"museum", "music_cast", "music_history", "music_note", "music_note", "music_note_add", "music_off", "music_off", 
"music_video", "music_video", "my_location", "my_location", "mystery", "nat", "nat", "nature", 
"nature", "nature_people", "nature_people", "navigate_before", "navigate_next", "navigation", "navigation", "near_me", 
"near_me", "near_me_disabled", "near_me_disabled", "nearby", "nearby_error", "nearby_error", "nearby_off", "nearby_off", 
"nephrology", "nest_audio", "nest_cam_floodlight", "nest_cam_indoor", "nest_cam_iq", "nest_cam_iq_outdoor", "nest_cam_magnet_mount", "nest_cam_outdoor", 
"nest_cam_stand", "nest_cam_wall_mount", "nest_cam_wired_stand", "nest_cam_wired_stand", "nest_clock_farsight_analog", "nest_clock_farsight_digital", "nest_connect", "nest_detect", 
"nest_display", "nest_display_max", "nest_doorbell_visitor", "nest_eco_leaf", "nest_farsight_cool", "nest_farsight_dual", "nest_farsight_eco", "nest_farsight_heat", 
"nest_farsight_seasonal", "nest_farsight_weather", "nest_found_savings", "nest_heat_link_e", "nest_heat_link_gen_3", "nest_hello_doorbell", "nest_mini", "nest_multi_room", 
"nest_protect", "nest_remote_comfort_sensor", "nest_secure_alarm", "nest_sunblock", "nest_tag", "nest_thermostat", "nest_thermostat_e_eu", "nest_thermostat_gen_3", 
"nest_thermostat_sensor", "nest_thermostat_sensor_eu", "nest_thermostat_zirconium_eu", "nest_true_radiant", "nest_wake_on_approach", "nest_wake_on_press", "nest_wifi_point", "nest_wifi_pro", 
"nest_wifi_pro_2", "nest_wifi_router", "network_cell", "network_cell", "network_check", "network_check", "network_intel_node", "network_intelligence", 
"network_intelligence_history", "network_intelligence_update", "network_locked", "network_locked", "network_manage", "network_node", "network_ping", "network_ping", 
"network_wifi", "network_wifi", "network_wifi_1_bar", "network_wifi_1_bar", "network_wifi_1_bar_locked", "network_wifi_2_bar", "network_wifi_2_bar", "network_wifi_2_bar_locked", 
"network_wifi_3_bar", "network_wifi_3_bar", "network_wifi_3_bar_locked", "network_wifi_locked", "neurology", "new_label", "new_label", "new_releases", 
"new_window", "news", "newsmode", "newspaper", "newspaper", "newsstand", "next_plan", "next_plan", 
"next_week", "next_week", "nfc", "nfc", "nfc_off", "night_shelter", "night_shelter", "night_sight_auto", 
"night_sight_auto_off", "night_sight_max", "nightlife", "nightlife", "nightlight", "nightlight", "nightlight_round", "nights_stay", 
"no_accounts", "no_accounts", "no_adult_content", "no_adult_content", "no_backpack", "no_backpack", "no_cell", "no_crash", 
"no_crash", "no_drinks", "no_drinks", "no_encryption", "no_encryption", "no_encryption_gmailerrorred", "no_flash", "no_flash", 
"no_food", "no_food", "no_luggage", "no_luggage", "no_meals", "no_meals", "no_meals_ouline", "no_meeting_room", 
"no_meeting_room", "no_photography", "no_photography", "no_sim", "no_sim", "no_sound", "no_stroller", "no_stroller", 
"no_transfer", "no_transfer", "noise_aware", "noise_aware", "noise_control_off", "noise_control_off", "noise_control_on", "nordic_walking", 
"nordic_walking", "north", "north", "north_east", "north_east", "north_west", "north_west", "not_accessible", 
"not_accessible", "not_accessible_forward", "not_interested", "not_listed_location", "not_listed_location", "not_started", "not_started", "note", 
"note_add", "note_add", "note_alt", "note_alt", "note_stack", "note_stack_add", "notes", "notes", 
"notification_add", "notification_add", "notification_important", "notification_important", "notification_multiple", "notification_settings", "notification_sound", "notifications", 
"notifications", "notifications_active", "notifications_active", "notifications_none", "notifications_off", "notifications_off", "notifications_paused", "notifications_paused", 
"notifications_unread", "numbers", "numbers", "nutrition", "ods", "odt", "offline_bolt", "offline_bolt", 
"offline_pin", "offline_pin", "offline_pin_off", "offline_share", "oil_barrel", "oil_barrel", "okonomiyaki", "on_device_training", 
"on_device_training", "on_hub_device", "oncology", "ondemand_video", "online_prediction", "online_prediction", "onsen", "opacity", 
"opacity", "open_in_browser", "open_in_browser", "open_in_full", "open_in_full", "open_in_new", "open_in_new", "open_in_new_down", 
"open_in_new_off", "open_in_new_off", "open_jam", "open_run", "open_with", "open_with", "ophthalmology", "oral_disease", 
"orbit", "order_approve", "order_play", "orders", "orthopedics", "other_admission", "other_houses", "other_houses", 
"outbound", "outbound", "outbox", "outbox", "outbox_alt", "outdoor_garden", "outdoor_grill", "outdoor_grill", 
"outgoing_mail", "outgoing_mail", "outlet", "outlet", "outlined_flag", "outpatient", "outpatient_med", "output", 
"output", "output_circle", "oven", "oven_gen", "overview", "overview_key", "owl", "oxygen_saturation", 
"p2p", "pace", "pacemaker", "package", "package_2", "padding", "padding", "padel", 
"page_control", "page_footer", "page_header", "page_info", "page_menu_ios", "pageless", "pages", "pages", 
"pageview", "pageview", "paid", "paid", "palette", "palette", "pallet", "pallet", 
"pan_tool", "pan_tool", "pan_tool_alt", "pan_tool_alt", "pan_zoom", "panorama", "panorama", "panorama_fish_eye", 
"panorama_horizontal", "panorama_horizontal", "panorama_horizontal_select", "panorama_photosphere", "panorama_photosphere", "panorama_photosphere_select", "panorama_vertical", "panorama_vertical", 
"panorama_vertical_select", "panorama_wide_angle", "panorama_wide_angle", "panorama_wide_angle_select", "paragliding", "paragliding", "parent_child_dining", "park", 
"park", "parking_meter", "parking_sign", "parking_valet", "partly_cloudy_day", "partly_cloudy_night", "partner_exchange", "partner_heart", 
"partner_reports", "party_mode", "party_mode", "passkey", "password", "password", "password_2", "password_2_off", 
"patient_list", "pattern", "pattern", "pause", "pause", "pause_circle", "pause_circle", "pause_circle_filled", 
"pause_circle_outline", "pause_presentation", "pause_presentation", "payment", "payment_arrow_down", "payment_card", "payments", "payments", 
"pedal_bike", "pedal_bike", "pediatrics", "pen_size_1", "pen_size_2", "pen_size_3", "pen_size_4", "pen_size_5", 
"pending", "pending", "pending_actions", "pending_actions", "pentagon", "pentagon", "people", "people_alt", 
"people_outline", "percent", "percent", "percent_discount", "pergola", "perm_camera_mic", "perm_camera_mic", "perm_contact_calendar", 
"perm_contact_calendar", "perm_data_setting", "perm_data_setting", "perm_device_information", "perm_identity", "perm_media", "perm_media", "perm_phone_msg", 
"perm_phone_msg", "perm_scan_wifi", "perm_scan_wifi", "person", "person", "person_2", "person_2", "person_3", 
"person_3", "person_4", "person_4", "person_add", "person_add", "person_add_alt", "person_add_alt_1", "person_add_disabled", 
"person_add_disabled", "person_alert", "person_apron", "person_book", "person_cancel", "person_celebrate", "person_check", "person_edit", 
"person_heart", "person_off", "person_off", "person_outline", "person_pin", "person_pin", "person_pin_circle", "person_pin_circle", 
"person_play", "person_raised_hand", "person_remove", "person_remove", "person_remove_alt_1", "person_search", "person_search", "person_shield", 
"personal_bag", "personal_bag_off", "personal_bag_question", "personal_injury", "personal_injury", "personal_places", "personal_video", "pest_control", 
"pest_control", "pest_control_rodent", "pest_control_rodent", "pet_supplies", "pets", "pets", "phishing", "phishing", 
"phone", "phone_android", "phone_bluetooth_speaker", "phone_bluetooth_speaker", "phone_callback", "phone_callback", "phone_disabled", "phone_disabled", 
"phone_enabled", "phone_enabled", "phone_forwarded", "phone_forwarded", "phone_in_talk", "phone_iphone", "phone_locked", "phone_locked", 
"phone_missed", "phone_missed", "phone_paused", "phone_paused", "phonelink", "phonelink_erase", "phonelink_lock", "phonelink_off", 
"phonelink_ring", "phonelink_setup", "photo", "photo", "photo_album", "photo_album", "photo_auto_merge", "photo_camera", 
"photo_camera", "photo_camera_back", "photo_camera_back", "photo_camera_front", "photo_camera_front", "photo_filter", "photo_frame", "photo_library", 
"photo_library", "photo_prints", "photo_size_select_actual", "photo_size_select_large", "photo_size_select_large", "photo_size_select_small", "photo_size_select_small", "php", 
"php", "physical_therapy", "piano", "piano", "piano_off", "piano_off", "pickleball", "picture_as_pdf", 
"picture_as_pdf", "picture_in_picture", "picture_in_picture", "picture_in_picture_alt", "picture_in_picture_alt", "picture_in_picture_center", "picture_in_picture_large", "picture_in_picture_medium", 
"picture_in_picture_mobile", "picture_in_picture_off", "picture_in_picture_small", "pie_chart", "pie_chart", "pie_chart_outline", "pie_chart_outlined", "pill", 
"pill_off", "pin", "pin", "pin_drop", "pin_drop", "pin_end", "pin_end", "pin_invoke", 
"pin_invoke", "pinboard", "pinboard_unread", "pinch", "pinch", "pinch_zoom_in", "pinch_zoom_out", "pip", 
"pip_exit", "pivot_table_chart", "pivot_table_chart", "pix", "place", "place_item", "plagiarism", "plagiarism", 
"plane_contrails", "planet", "planner_banner_ad_pt", "planner_review", "play_arrow", "play_arrow", "play_circle", "play_circle", 
"play_circle_filled", "play_circle_outline", "play_disabled", "play_disabled", "play_for_work", "play_for_work", "play_lesson", "play_lesson", 
"play_pause", "playground", "playground_2", "playing_cards", "playlist_add", "playlist_add", "playlist_add_check", "playlist_add_check", 
"playlist_add_check_circle", "playlist_add_check_circle", "playlist_add_circle", "playlist_add_circle", "playlist_play", "playlist_play", "playlist_remove", "playlist_remove", 
"plug_connect", "plumbing", "plumbing", "plus_one", "podcasts", "podcasts", "podiatry", "podium", 
"point_of_sale", "point_of_sale", "point_scan", "poker_chip", "policy", "policy", "policy_alert", "poll", 
"polyline", "polyline", "polymer", "polymer", "pool", "pool", "portable_wifi_off", "portable_wifi_off", 
"portrait", "position_bottom_left", "position_bottom_right", "position_top_right", "post", "post_add", "post_add", "potted_plant", 
"power", "power", "power_input", "power_input", "power_off", "power_off", "power_settings_circle", "power_settings_new", 
"power_settings_new", "prayer_times", "precision_manufacturing", "precision_manufacturing", "pregnancy", "pregnant_woman", "pregnant_woman", "preliminary", 
"prescriptions", "present_to_all", "present_to_all", "preview", "preview", "preview_off", "price_change", "price_change", 
"price_check", "price_check", "print", "print", "print_add", "print_connect", "print_disabled", "print_disabled", 
"print_error", "print_lock", "priority", "priority_high", "priority_high", "privacy", "privacy_tip", "privacy_tip", 
"private_connectivity", "private_connectivity", "problem", "procedure", "process_chart", "production_quantity_limits", "production_quantity_limits", "productivity", 
"progress_activity", "prompt_suggestion", "propane", "propane", "propane_tank", "propane_tank", "psychiatry", "psychology", 
"psychology", "psychology_alt", "psychology_alt", "public", "public", "public_off", "public_off", "publish", 
"publish", "published_with_changes", "published_with_changes", "pulmonology", "pulse_alert", "punch_clock", "punch_clock", "push_pin", 
"qr_code", "qr_code", "qr_code_2", "qr_code_2", "qr_code_2_add", "qr_code_scanner", "qr_code_scanner", "query_builder", 
"query_stats", "query_stats", "question_answer", "question_exchange", "question_mark", "question_mark", "queue", "queue_music", 
"queue_music", "queue_play_next", "queue_play_next", "quick_phrases", "quick_reference", "quick_reference_all", "quick_reorder", "quickreply", 
"quickreply", "quiz", "quiz", "r_mobiledata", "r_mobiledata", "radar", "radar", "radio", 
"radio", "radio_button_checked", "radio_button_checked", "radio_button_partial", "radio_button_unchecked", "radio_button_unchecked", "radiology", "railway_alert", 
"railway_alert", "railway_alert_2", "rainy", "rainy_heavy", "rainy_light", "rainy_snow", "ramen_dining", "ramen_dining", 
"ramp_left", "ramp_left", "ramp_right", "ramp_right", "range_hood", "rate_review", "rate_review", "raven", 
"raw_off", "raw_off", "raw_on", "raw_on", "read_more", "read_more", "readiness_score", "real_estate_agent", 
"real_estate_agent", "rear_camera", "rebase", "rebase_edit", "rebase_edit", "receipt", "receipt", "receipt_long", 
"receipt_long", "receipt_long_off", "recent_actors", "recent_actors", "recent_patient", "recenter", "recommend", "recommend", 
"record_voice_over", "record_voice_over", "rectangle", "rectangle", "recycling", "recycling", "redeem", "redeem", 
"redo", "redo", "reduce_capacity", "reduce_capacity", "refresh", "refresh", "regular_expression", "relax", 
"release_alert", "remember_me", "remember_me", "reminder", "remote_gen", "remove", "remove", "remove_circle", 
"remove_circle_outline", "remove_done", "remove_done", "remove_from_queue", "remove_from_queue", "remove_moderator", "remove_moderator", "remove_red_eye", 
"remove_road", "remove_road", "remove_selection", "remove_shopping_cart", "remove_shopping_cart", "reopen_window", "reorder", "reorder", 
"repartition", "repartition", "repeat", "repeat", "repeat_on", "repeat_on", "repeat_one", "repeat_one", 
"repeat_one_on", "repeat_one_on", "replace_audio", "replace_image", "replace_video", "replay", "replay", "replay_10", 
"replay_10", "replay_30", "replay_30", "replay_5", "replay_5", "replay_circle_filled", "reply", "reply", 
"reply_all", "reply_all", "report", "report", "report_gmailerrorred", "report_off", "report_off", "report_problem", 
"request_page", "request_page", "request_quote", "request_quote", "reset_brightness", "reset_exposure", "reset_focus", "reset_image", 
"reset_iso", "reset_settings", "reset_shadow", "reset_shutter_speed", "reset_tv", "reset_tv", "reset_white_balance", "reset_wrench", 
"resize", "respiratory_rate", "responsive_layout", "rest_area", "restart_alt", "restart_alt", "restaurant", "restaurant", 
"restaurant_menu", "restore", "restore_from_trash", "restore_from_trash", "restore_page", "restore_page", "resume", "reviews", 
"reviews", "rewarded_ads", "rheumatology", "rib_cage", "rice_bowl", "rice_bowl", "right_click", "right_panel_close", 
"right_panel_open", "ring_volume", "ring_volume", "ripples", "road", "robot", "robot_2", "rocket", 
"rocket", "rocket_launch", "rocket_launch", "roller_shades", "roller_shades", "roller_shades_closed", "roller_shades_closed", "roller_skating", 
"roller_skating", "roofing", "roofing", "room", "room_preferences", "room_preferences", "room_service", "room_service", 
"rotate_90_degrees_ccw", "rotate_90_degrees_ccw", "rotate_90_degrees_cw", "rotate_90_degrees_cw", "rotate_auto", "rotate_left", "rotate_left", "rotate_right", 
"rotate_right", "roundabout_left", "roundabout_left", "roundabout_right", "roundabout_right", "rounded_corner", "rounded_corner", "route", 
"route", "router", "router", "router_off", "routine", "rowing", "rowing", "rss_feed", 
"rss_feed", "rsvp", "rsvp", "rtt", "rtt", "rubric", "rule", "rule", 
"rule_folder", "rule_folder", "rule_settings", "run_circle", "run_circle", "running_with_errors", "running_with_errors", "rv_hookup", 
"rv_hookup", "safety_check", "safety_check", "safety_check_off", "safety_divider", "safety_divider", "sailing", "sailing", 
"salinity", "sanitizer", "sanitizer", "satellite", "satellite", "satellite_alt", "satellite_alt", "sauna", 
"save", "save", "save_alt", "save_as", "save_as", "save_clock", "saved_search", "saved_search", 
"savings", "savings", "scale", "scale", "scan", "scan_delete", "scanner", "scanner", 
"scatter_plot", "scatter_plot", "scene", "schedule", "schedule", "schedule_send", "schedule_send", "schema", 
"schema", "school", "school", "science", "science", "science_off", "scooter", "score", 
"score", "scoreboard", "scoreboard", "screen_lock_landscape", "screen_lock_portrait", "screen_lock_rotation", "screen_record", "screen_rotation", 
"screen_rotation_alt", "screen_rotation_alt", "screen_rotation_up", "screen_search_desktop", "screen_search_desktop", "screen_share", "screen_share", "screenshot", 
"screenshot_frame", "screenshot_frame_2", "screenshot_keyboard", "screenshot_monitor", "screenshot_monitor", "screenshot_region", "screenshot_tablet", "script", 
"scrollable_header", "scuba_diving", "scuba_diving", "sd", "sd", "sd_card", "sd_card", "sd_card_alert", 
"sd_card_alert", "sd_storage", "sdk", "search", "search", "search_activity", "search_check", "search_check_2", 
"search_gear", "search_hands_free", "search_insights", "search_off", "search_off", "seat_cool_left", "seat_cool_right", "seat_heat_left", 
"seat_heat_right", "seat_vent_left", "seat_vent_right", "security", "security", "security_key", "security_update", "security_update_good", 
"security_update_warning", "segment", "segment", "select", "select_all", "select_all", "select_check_box", "select_to_speak", 
"select_window", "select_window_2", "select_window_off", "self_care", "self_improvement", "self_improvement", "sell", "sell", 
"send", "send", "send_and_archive", "send_and_archive", "send_money", "send_time_extension", "send_time_extension", "send_to_mobile", 
"sensor_door", "sensor_door", "sensor_occupied", "sensor_occupied", "sensor_window", "sensor_window", "sensors", "sensors", 
"sensors_krx", "sensors_krx_off", "sensors_off", "sensors_off", "sentiment_calm", "sentiment_content", "sentiment_dissatisfied", "sentiment_dissatisfied", 
"sentiment_excited", "sentiment_extremely_dissatisfied", "sentiment_frustrated", "sentiment_neutral", "sentiment_neutral", "sentiment_sad", "sentiment_satisfied", "sentiment_satisfied", 
"sentiment_satisfied_alt", "sentiment_stressed", "sentiment_very_dissatisfied", "sentiment_very_dissatisfied", "sentiment_very_satisfied", "sentiment_very_satisfied", "sentiment_worried", "serif", 
"server_person", "service_toolbox", "set_meal", "set_meal", "settings", "settings", "settings_accessibility", "settings_accessibility", 
"settings_account_box", "settings_alert", "settings_applications", "settings_applications", "settings_b_roll", "settings_backup_restore", "settings_backup_restore", "settings_bluetooth", 
"settings_bluetooth", "settings_brightness", "settings_brightness", "settings_cell", "settings_cinematic_blur", "settings_ethernet", "settings_ethernet", "settings_heart", 
"settings_input_antenna", "settings_input_antenna", "settings_input_component", "settings_input_component", "settings_input_composite", "settings_input_hdmi", "settings_input_hdmi", "settings_input_svideo", 
"settings_input_svideo", "settings_motion_mode", "settings_night_sight", "settings_overscan", "settings_overscan", "settings_panorama", "settings_phone", "settings_phone", 
"settings_photo_camera", "settings_power", "settings_power", "settings_remote", "settings_remote", "settings_seating", "settings_slow_motion", "settings_suggest", 
"settings_system_daydream", "settings_system_daydream", "settings_timelapse", "settings_video_camera", "settings_voice", "settings_voice", "settop_component", "severe_cold", 
"severe_cold", "shadow", "shadow_add", "shadow_minus", "shape_line", "shape_line", "shapes", "share", 
"share", "share_eta", "share_location", "share_location", "share_off", "share_reviews", "share_windows", "shaved_ice", 
"sheets_rtl", "shelf_auto_hide", "shelf_position", "shelves", "shelves", "shield", "shield", "shield_lock", 
"shield_locked", "shield_moon", "shield_moon", "shield_person", "shield_question", "shield_toggle", "shield_watch", "shield_with_heart", 
"shield_with_house", "shift", "shift_lock", "shift_lock_off", "shop", "shop", "shop_2", "shop_two", 
"shop_two", "shopping_bag", "shopping_bag", "shopping_bag_speed", "shopping_basket", "shopping_basket", "shopping_cart", "shopping_cart", 
"shopping_cart_checkout", "shopping_cart_checkout", "shopping_cart_off", "shoppingmode", "short_stay", "short_text", "short_text", "shortcut", 
"show_chart", "show_chart", "shower", "shower", "shuffle", "shuffle", "shuffle_on", "shuffle_on", 
"shutter_speed", "shutter_speed", "shutter_speed_add", "shutter_speed_minus", "sick", "sick", "side_navigation", "sign_language", 
"sign_language", "signal_cellular_0_bar", "signal_cellular_0_bar", "signal_cellular_1_bar", "signal_cellular_1_bar", "signal_cellular_2_bar", "signal_cellular_2_bar", "signal_cellular_3_bar", 
"signal_cellular_3_bar", "signal_cellular_4_bar", "signal_cellular_4_bar", "signal_cellular_add", "signal_cellular_alt", "signal_cellular_alt", "signal_cellular_alt_1_bar", "signal_cellular_alt_1_bar", 
"signal_cellular_alt_2_bar", "signal_cellular_alt_2_bar", "signal_cellular_connected_no_internet_0_bar", "signal_cellular_connected_no_internet_0_bar", "signal_cellular_connected_no_internet_1_bar", "signal_cellular_connected_no_internet_2_bar", "signal_cellular_connected_no_internet_3_bar", "signal_cellular_connected_no_internet_4_bar", 
"signal_cellular_connected_no_internet_4_bar", "signal_cellular_no_sim", "signal_cellular_nodata", "signal_cellular_nodata", "signal_cellular_null", "signal_cellular_null", "signal_cellular_off", "signal_cellular_off", 
"signal_cellular_pause", "signal_disconnected", "signal_wifi_0_bar", "signal_wifi_0_bar", "signal_wifi_1_bar", "signal_wifi_1_bar_lock", "signal_wifi_2_bar", "signal_wifi_2_bar_lock", 
"signal_wifi_3_bar", "signal_wifi_3_bar_lock", "signal_wifi_4_bar", "signal_wifi_4_bar", "signal_wifi_4_bar_lock", "signal_wifi_bad", "signal_wifi_bad", "signal_wifi_connected_no_internet_0", 
"signal_wifi_connected_no_internet_1", "signal_wifi_connected_no_internet_2", "signal_wifi_connected_no_internet_3", "signal_wifi_connected_no_internet_4", "signal_wifi_off", "signal_wifi_off", "signal_wifi_statusbar_1_bar", "signal_wifi_statusbar_2_bar", 
"signal_wifi_statusbar_3_bar", "signal_wifi_statusbar_4_bar", "signal_wifi_statusbar_connected_no_internet", "signal_wifi_statusbar_connected_no_internet_1", "signal_wifi_statusbar_connected_no_internet_2", "signal_wifi_statusbar_connected_no_internet_3", "signal_wifi_statusbar_connected_no_internet_4", "signal_wifi_statusbar_not_connected", 
"signal_wifi_statusbar_not_connected", "signal_wifi_statusbar_null", "signal_wifi_statusbar_null", "signature", "signpost", "signpost", "sim_card", "sim_card", 
"sim_card_alert", "sim_card_download", "sim_card_download", "simulation", "single_bed", "single_bed", "sip", "sip", 
"siren", "siren_check", "siren_open", "siren_question", "skateboarding", "skateboarding", "skeleton", "skillet", 
"skillet_cooktop", "skip_next", "skip_next", "skip_previous", "skip_previous", "skull", "skull_list", "slab_serif", 
"sledding", "sledding", "sleep_score", "slide_library", "sliders", "slideshow", "slideshow", "slow_motion_video", 
"slow_motion_video", "smart_button", "smart_card_reader", "smart_card_reader_off", "smart_display", "smart_display", "smart_outlet", "smart_screen", 
"smart_toy", "smart_toy", "smartphone", "smb_share", "smoke_free", "smoke_free", "smoking_rooms", "smoking_rooms", 
"sms", "sms", "sms_failed", "snippet_folder", "snippet_folder", "snooze", "snooze", "snowboarding", 
"snowboarding", "snowing", "snowing", "snowing_heavy", "snowmobile", "snowmobile", "snowshoeing", "snowshoeing", 
"soap", "soap", "soba", "social_distance", "social_distance", "social_leaderboard", "solar_power", "solar_power", 
"solo_dining", "sort", "sort", "sort_by_alpha", "sort_by_alpha", "sos", "sos", "sound_detection_dog_barking", 
"sound_detection_glass_break", "sound_detection_loud_sound", "sound_sampler", "soup_kitchen", "soup_kitchen", "source", "source_environment", "source_notes", 
"south", "south", "south_america", "south_america", "south_east", "south_east", "south_west", "south_west", 
"spa", "spa", "space_bar", "space_bar", "space_dashboard", "space_dashboard", "spatial_audio", "spatial_audio", 
"spatial_audio_off", "spatial_audio_off", "spatial_speaker", "spatial_tracking", "spatial_tracking", "speaker", "speaker", "speaker_group", 
"speaker_group", "speaker_notes", "speaker_notes", "speaker_notes_off", "speaker_notes_off", "speaker_phone", "speaker_phone", "special_character", 
"specific_gravity", "speech_to_text", "speed", "speed", "speed_0_25", "speed_0_2x", "speed_0_5", "speed_0_5x", 
"speed_0_75", "speed_0_7x", "speed_1_2", "speed_1_25", "speed_1_2x", "speed_1_5", "speed_1_5x", "speed_1_75", 
"speed_1_7x", "speed_2x", "speed_camera", "spellcheck", "spellcheck", "split_scene", "split_scene_down", "split_scene_left", 
"split_scene_right", "split_scene_up", "splitscreen", "splitscreen", "splitscreen_add", "splitscreen_bottom", "splitscreen_landscape", "splitscreen_left", 
"splitscreen_portrait", "splitscreen_right", "splitscreen_top", "splitscreen_vertical_add", "spo2", "spoke", "spoke", "sports", 
"sports", "sports_and_outdoors", "sports_bar", "sports_bar", "sports_baseball", "sports_baseball", "sports_basketball", "sports_basketball", 
"sports_cricket", "sports_cricket", "sports_esports", "sports_esports", "sports_football", "sports_football", "sports_golf", "sports_golf", 
"sports_gymnastics", "sports_gymnastics", "sports_handball", "sports_handball", "sports_hockey", "sports_hockey", "sports_kabaddi", "sports_kabaddi", 
"sports_martial_arts", "sports_martial_arts", "sports_mma", "sports_mma", "sports_motorsports", "sports_motorsports", "sports_rugby", "sports_rugby", 
"sports_score", "sports_score", "sports_soccer", "sports_soccer", "sports_tennis", "sports_tennis", "sports_volleyball", "sports_volleyball", 
"sprinkler", "sprint", "square", "square", "square_dot", "square_foot", "square_foot", "ssid_chart", 
"ssid_chart", "stack", "stack_group", "stack_hexagon", "stack_off", "stack_star", "stacked_bar_chart", "stacked_bar_chart", 
"stacked_email", "stacked_inbox", "stacked_line_chart", "stacked_line_chart", "stacks", "stadia_controller", "stadium", "stadium", 
"stairs", "stairs", "stairs_2", "star", "star", "star_border", "star_border_purple500", "star_half", 
"star_half", "star_outline", "star_purple500", "star_rate", "star_rate", "star_rate_half", "star_shine", "stars", 
"stars", "stars_2", "start", "start", "stat_0", "stat_1", "stat_2", "stat_3", 
"stat_minus_1", "stat_minus_2", "stat_minus_3", "stay_current_landscape", "stay_current_portrait", "stay_primary_landscape", "stay_primary_portrait", "steering_wheel_heat", 
"step", "step_into", "step_out", "step_over", "steppers", "steps", "stethoscope", "stethoscope_arrow", 
"stethoscope_check", "sticky_note", "sticky_note_2", "sticky_note_2", "stock_media", "stockpot", "stop", "stop", 
"stop_circle", "stop_circle", "stop_screen_share", "stop_screen_share", "storage", "storage", "store", "store", 
"store_mall_directory", "storefront", "storefront", "storm", "storm", "straight", "straight", "straighten", 
"straighten", "strategy", "stream", "stream", "streetview", "streetview", "stress_management", "strikethrough_s", 
"strikethrough_s", "stroke_full", "stroke_partial", "stroller", "stroller", "style", "style", "styler", 
"stylus", "stylus_brush", "stylus_fountain_pen", "stylus_highlighter", "stylus_laser_pointer", "stylus_note", "stylus_pen", "stylus_pencil", 
"subdirectory_arrow_left", "subdirectory_arrow_left", "subdirectory_arrow_right", "subdirectory_arrow_right", "subheader", "subject", "subject", "subscript", 
"subscript", "subscriptions", "subscriptions", "subtitles", "subtitles", "subtitles_gear", "subtitles_off", "subtitles_off", 
"subway", "subway", "subway_walk", "summarize", "summarize", "sunny", "sunny", "sunny_snowing", 
"sunny_snowing", "superscript", "superscript", "supervised_user_circle", "supervised_user_circle", "supervised_user_circle_off", "supervisor_account", "supervisor_account", 
"support", "support", "support_agent", "support_agent", "surfing", "surfing", "surgical", "surround_sound", 
"surround_sound", "swap_calls", "swap_calls", "swap_driving_apps", "swap_driving_apps_wheel", "swap_horiz", "swap_horiz", "swap_horizontal_circle", 
"swap_horizontal_circle", "swap_vert", "swap_vert", "swap_vertical_circle", "swap_vertical_circle", "sweep", "swipe", "swipe", 
"swipe_down", "swipe_down", "swipe_down_alt", "swipe_down_alt", "swipe_left", "swipe_left", "swipe_left_alt", "swipe_left_alt", 
"swipe_right", "swipe_right", "swipe_right_alt", "swipe_right_alt", "swipe_up", "swipe_up", "swipe_up_alt", "swipe_up_alt", 
"swipe_vertical", "swipe_vertical", "switch", "switch_access", "switch_access_2", "switch_access_3", "switch_access_shortcut", "switch_access_shortcut", 
"switch_access_shortcut_add", "switch_access_shortcut_add", "switch_account", "switch_account", "switch_camera", "switch_camera", "switch_left", "switch_left", 
"switch_right", "switch_right", "switch_video", "switch_video", "switches", "sword_rose", "swords", "symptoms", 
"synagogue", "synagogue", "sync", "sync", "sync_alt", "sync_alt", "sync_arrow_down", "sync_arrow_up", 
"sync_desktop", "sync_disabled", "sync_disabled", "sync_lock", "sync_lock", "sync_problem", "sync_problem", "sync_saved_locally", 
"sync_saved_locally_off", "syringe", "system_security_update", "system_security_update_good", "system_security_update_warning", "system_update", "system_update_alt", "system_update_alt", 
"tab", "tab", "tab_close", "tab_close_inactive", "tab_close_right", "tab_duplicate", "tab_group", "tab_inactive", 
"tab_move", "tab_new_right", "tab_recent", "tab_search", "tab_unselected", "tab_unselected", "table", "table_bar", 
"table_bar", "table_chart", "table_chart", "table_chart_view", "table_convert", "table_edit", "table_eye", "table_lamp", 
"table_large", "table_restaurant", "table_restaurant", "table_rows", "table_rows", "table_rows_narrow", "table_sign", "table_view", 
"table_view", "tablet", "tablet", "tablet_android", "tablet_android", "tablet_camera", "tablet_mac", "tablet_mac", 
"tabs", "tactic", "tag", "tag", "tag_faces", "takeout_dining", "takeout_dining", "takeout_dining_2", 
"tamper_detection_off", "tamper_detection_on", "tap_and_play", "tapas", "tapas", "target", "task", "task", 
"task_alt", "task_alt", "tatami_seat", "taunt", "taxi_alert", "taxi_alert", "team_dashboard", "temp_preferences_eco", 
"temple_buddhist", "temple_buddhist", "temple_hindu", "temple_hindu", "tenancy", "terminal", "terminal", "terrain", 
"text_ad", "text_compare", "text_decrease", "text_decrease", "text_fields", "text_fields", "text_fields_alt", "text_format", 
"text_format", "text_increase", "text_increase", "text_rotate_up", "text_rotate_up", "text_rotate_vertical", "text_rotate_vertical", "text_rotation_angledown", 
"text_rotation_angledown", "text_rotation_angleup", "text_rotation_angleup", "text_rotation_down", "text_rotation_down", "text_rotation_none", "text_rotation_none", "text_select_end", 
"text_select_jump_to_beginning", "text_select_jump_to_end", "text_select_move_back_character", "text_select_move_back_word", "text_select_move_down", "text_select_move_forward_character", "text_select_move_forward_word", "text_select_move_up", 
"text_select_start", "text_snippet", "text_snippet", "text_to_speech", "text_up", "textsms", "texture", "texture", 
"texture_add", "texture_minus", "theater_comedy", "theater_comedy", "theaters", "theaters", "thermometer", "thermometer_add", 
"thermometer_gain", "thermometer_loss", "thermometer_minus", "thermostat", "thermostat", "thermostat_arrow_down", "thermostat_arrow_up", "thermostat_auto", 
"thermostat_auto", "thermostat_carbon", "things_to_do", "thread_unread", "threat_intelligence", "thumb_down", "thumb_down", "thumb_down_alt", 
"thumb_down_off_alt", "thumb_up", "thumb_up", "thumb_up_alt", "thumb_up_off_alt", "thumbnail_bar", "thumbs_up_double", "thumbs_up_down", 
"thumbs_up_down", "thunderstorm", "thunderstorm", "tibia", "tibia_alt", "tile_large", "tile_medium", "tile_small", 
"time_auto", "time_to_leave", "timelapse", "timelapse", "timeline", "timeline", "timer", "timer", 
"timer_1", "timer_10", "timer_10", "timer_10_alt_1", "timer_10_select", "timer_10_select", "timer_2", "timer_3", 
"timer_3", "timer_3_alt_1", "timer_3_select", "timer_3_select", "timer_5", "timer_5_shutter", "timer_arrow_down", "timer_arrow_up", 
"timer_off", "timer_off", "timer_pause", "timer_play", "tips_and_updates", "tire_repair", "tire_repair", "title", 
"title", "titlecase", "toast", "toc", "toc", "today", "today", "toggle_off", 
"toggle_off", "toggle_on", "toggle_on", "token", "token", "toll", "toll", "tonality", 
"tonality", "tonality_2", "toolbar", "tools_flat_head", "tools_installation_kit", "tools_ladder", "tools_level", "tools_phillips", 
"tools_pliers_wire_stripper", "tools_power_drill", "tooltip", "tooltip_2", "top_panel_close", "top_panel_open", "topic", "topic", 
"tornado", "tornado", "total_dissolved_solids", "touch_app", "touch_app", "touch_double", "touch_long", "touch_triple", 
"touchpad_mouse", "touchpad_mouse_off", "tour", "tour", "toys", "toys", "toys_and_games", "toys_fan", 
"track_changes", "track_changes", "trackpad_input", "trackpad_input_2", "trackpad_input_3", "traffic", "traffic", "traffic_jam", 
"trail_length", "trail_length_medium", "trail_length_short", "train", "train", "tram", "tram", "transcribe", 
"transfer_within_a_station", "transfer_within_a_station", "transform", "transform", "transgender", "transgender", "transit_enterexit", "transit_enterexit", 
"transit_ticket", "transition_chop", "transition_dissolve", "transition_fade", "transition_push", "transition_slide", "translate", "translate", 
"translate_indic", "transportation", "travel", "travel_explore", "travel_explore", "travel_luggage_and_bags", "trending_down", "trending_down", 
"trending_flat", "trending_flat", "trending_up", "trending_up", "trip", "trip_origin", "trip_origin", "trolley", 
"trolley", "trolley_cable_car", "trophy", "troubleshoot", "troubleshoot", "try", "tsunami", "tsunami", 
"tsv", "tty", "tty", "tune", "tune", "tungsten", "turn_left", "turn_left", 
"turn_right", "turn_right", "turn_sharp_left", "turn_sharp_left", "turn_sharp_right", "turn_sharp_right", "turn_slight_left", "turn_slight_left", 
"turn_slight_right", "turn_slight_right", "turned_in", "turned_in_not", "tv", "tv", "tv_displays", "tv_gen", 
"tv_guide", "tv_next", "tv_off", "tv_off", "tv_options_edit_channels", "tv_options_input_settings", "tv_remote", "tv_signin", 
"tv_with_assistant", "two_pager", "two_pager_store", "two_wheeler", "two_wheeler", "type_specimen", "type_specimen", "u_turn_left", 
"u_turn_left", "u_turn_right", "u_turn_right", "udon", "ulna_radius", "ulna_radius_alt", "umbrella", "umbrella", 
"unarchive", "unarchive", "undo", "undo", "unfold_less", "unfold_less", "unfold_less_double", "unfold_less_double", 
"unfold_more", "unfold_more", "unfold_more_double", "unfold_more_double", "ungroup", "universal_currency", "universal_currency_alt", "universal_local", 
"unknown_2", "unknown_5", "unknown_7", "unknown_document", "unknown_med", "unlicense", "unpaved_road", "unpublished", 
"unpublished", "unsubscribe", "unsubscribe", "upcoming", "upcoming", "update", "update", "update_disabled", 
"update_disabled", "upgrade", "upgrade", "upi_pay", "upload", "upload", "upload_2", "upload_file", 
"upload_file", "uppercase", "urology", "usb", "usb", "usb_off", "usb_off", "user_attributes", 
"vaccines", "vaccines", "vacuum", "valve", "vape_free", "vape_free", "vaping_rooms", "vaping_rooms", 
"variable_add", "variable_insert", "variable_remove", "variables", "ventilator", "verified", "verified", "verified_off", 
"verified_user", "verified_user", "vertical_align_bottom", "vertical_align_bottom", "vertical_align_center", "vertical_align_center", "vertical_align_top", "vertical_align_top", 
"vertical_distribute", "vertical_distribute", "vertical_shades", "vertical_shades", "vertical_shades_closed", "vertical_shades_closed", "vertical_split", "vertical_split", 
"vibration", "video_call", "video_call", "video_camera_back", "video_camera_back", "video_camera_back_add", "video_camera_front", "video_camera_front", 
"video_camera_front_off", "video_chat", "video_chat", "video_file", "video_file", "video_label", "video_label", "video_library", 
"video_library", "video_search", "video_settings", "video_settings", "video_stable", "video_stable", "videocam", "videocam", 
"videocam_alert", "videocam_off", "videocam_off", "videogame_asset", "videogame_asset", "videogame_asset_off", "videogame_asset_off", "view_agenda", 
"view_agenda", "view_apps", "view_array", "view_array", "view_carousel", "view_carousel", "view_column", "view_column", 
"view_column_2", "view_comfy", "view_comfy", "view_comfy_alt", "view_comfy_alt", "view_compact", "view_compact", "view_compact_alt", 
"view_compact_alt", "view_cozy", "view_cozy", "view_day", "view_day", "view_headline", "view_headline", "view_in_ar", 
"view_in_ar", "view_in_ar_off", "view_kanban", "view_kanban", "view_list", "view_list", "view_module", "view_module", 
"view_object_track", "view_quilt", "view_quilt", "view_real_size", "view_sidebar", "view_sidebar", "view_stream", "view_stream", 
"view_timeline", "view_timeline", "view_week", "view_week", "vignette", "vignette", "vignette_2", "villa", 
"villa", "visibility", "visibility", "visibility_lock", "visibility_off", "visibility_off", "vital_signs", "vo2_max", 
"voice_chat", "voice_chat", "voice_over_off", "voice_over_off", "voice_selection", "voice_selection_off", "voicemail", "voicemail", 
"voicemail_2", "volcano", "volcano", "volume_down", "volume_down", "volume_down_alt", "volume_down_alt", "volume_mute", 
"volume_mute", "volume_off", "volume_off", "volume_up", "volume_up", "volunteer_activism", "volunteer_activism", "voting_chip", 
"vpn_key", "vpn_key", "vpn_key_alert", "vpn_key_off", "vpn_key_off", "vpn_lock", "vpn_lock", "vpn_lock_2", 
"vr180_create2d", "vr180_create2d_off", "vrpano", "vrpano", "wall_art", "wall_lamp", "wallet", "wallet", 
"wallpaper", "wallpaper", "wallpaper_slideshow", "wand_shine", "wand_stars", "ward", "warehouse", "warehouse", 
"warning", "warning", "warning_amber", "warning_off", "wash", "wash", "washoku", "watch", 
"watch", "watch_arrow", "watch_button_press", "watch_check", "watch_later", "watch_off", "watch_off", "watch_screentime", 
"watch_vibration", "watch_wake", "water", "water", "water_bottle", "water_bottle_large", "water_damage", "water_damage", 
"water_do", "water_drop", "water_drop", "water_ec", "water_full", "water_heater", "water_lock", "water_loss", 
"water_lux", "water_medium", "water_orp", "water_ph", "water_pump", "water_voc", "waterfall_chart", "waterfall_chart", 
"waves", "waves", "waving_hand", "waving_hand", "wb_auto", "wb_auto", "wb_cloudy", "wb_incandescent", 
"wb_incandescent", "wb_iridescent", "wb_iridescent", "wb_shade", "wb_shade", "wb_sunny", "wb_sunny", "wb_twighlight", 
"wb_twilight", "wb_twilight", "wc", "wc", "weather_hail", "weather_mix", "weather_snowy", "web", 
"web", "web_asset", "web_asset", "web_asset_off", "web_asset_off", "web_stories", "web_stories", "web_traffic", 
"webhook", "webhook", "weekend", "weekend", "weight", "west", "west", "whatshot", 
"whatshot", "wheelchair_pickup", "wheelchair_pickup", "where_to_vote", "where_to_vote", "widget_medium", "widget_small", "widget_width", 
"widgets", "widgets", "width_full", "width_full", "width_normal", "width_normal", "width_wide", "width_wide", 
"wifi", "wifi", "wifi_1_bar", "wifi_1_bar", "wifi_2_bar", "wifi_2_bar", "wifi_add", "wifi_calling", 
"wifi_calling", "wifi_calling_1", "wifi_calling_2", "wifi_calling_3", "wifi_calling_bar_1", "wifi_calling_bar_2", "wifi_calling_bar_3", "wifi_channel", 
"wifi_channel", "wifi_find", "wifi_find", "wifi_home", "wifi_lock", "wifi_lock", "wifi_notification", "wifi_off", 
"wifi_off", "wifi_password", "wifi_password", "wifi_protected_setup", "wifi_protected_setup", "wifi_proxy", "wifi_tethering", "wifi_tethering", 
"wifi_tethering_error", "wifi_tethering_error", "wifi_tethering_off", "wifi_tethering_off", "wind_power", "wind_power", "window", "window", 
"window_closed", "window_open", "window_sensor", "windshield_defrost_auto", "windshield_defrost_front", "windshield_defrost_rear", "windshield_heat_front", "wine_bar", 
"wine_bar", "woman", "woman", "woman_2", "woman_2", "work", "work", "work_alert", 
"work_history", "work_history", "work_off", "work_outline", "work_update", "workspace_premium", "workspace_premium", "workspaces", 
"workspaces", "workspaces_filled", "workspaces_outline", "wounds_injuries", "wrap_text", "wrap_text", "wrist", "wrong_location", 
"wrong_location", "wysiwyg", "wysiwyg", "yakitori", "yard", "yard", "yoshoku", "your_trips", 
"youtube_activity", "youtube_searched_for", "youtube_searched_for", "zone_person_alert", "zone_person_idle", "zone_person_urgent", "zoom_in", "zoom_in", 
"zoom_in_map", "zoom_in_map", "zoom_out", "zoom_out", "zoom_out_map", "zoom_out_map",
];

// HugeIcons Free (4000+ icons) - stroke style
const hugeIconsFree = [
    "abacus", "absolute", "acceleration", "access", "accident", "account-setting-01",
    "account-setting-02", "account-setting-03", "activity-01", "activity-02", "activity-03",
    "activity-04", "acute-angle", "add-01", "add-02", "add-circle", "add-circle-half-dot",
    "add-square", "add-team", "address-book", "adjust-brightness", "adobe-after-effect",
    "adobe-illustrator", "adobe-indesign", "adobe-photoshop", "adobe-premier", "adobe-xd",
    "adventure", "advertisement", "adzan", "affiliate", "agreement-01", "agreement-02",
    "agreement-03", "ai-book", "ai-brain-01", "ai-brain-02", "ai-brain-03", "ai-brain-04",
    "ai-brain-05", "ai-chat-01", "ai-chat-02", "ai-cloud-01", "ai-cloud-02", "ai-computer",
    "ai-dna", "ai-folder-01", "ai-folder-02", "ai-innovation-01", "ai-innovation-02",
    "ai-innovation-03", "ai-laptop", "ai-learning", "ai-lock", "ai-mail", "ai-network",
    "ai-phone-01", "ai-phone-02", "ai-search", "ai-security-01", "ai-security-02",
    "ai-smartwatch", "ai-view", "aids", "airbnb", "aircraft-game", "airdrop", "airplane-01",
    "airplane-02", "airplane-landing-01", "airplane-landing-02", "airplane-mode", "airplane-mode-off",
    "airplane-take-off-01", "airplane-take-off-02", "airplay-line", "airpod-01", "airpod-02",
    "airpod-03", "al-aqsa-mosque", "alarm-clock", "album-01", "album-02", "album-not-found-01",
    "album-not-found-02", "alert-01", "alert-02", "alert-circle", "alert-diamond", "alert-square",
    "algorithm", "alien-01", "alien-02", "align-bottom", "align-box-bottom-center", "align-box-bottom-left",
    "align-box-bottom-right", "align-box-middle-center", "align-box-middle-left", "align-box-middle-right",
    "align-box-top-center", "align-box-top-left", "align-box-top-right", "align-horizontal-center",
    "align-key-object", "align-left", "align-right", "align-selection", "align-top", "align-vertical-center",
    "all-bookmark", "allah", "alms", "alpha", "alpha-circle", "alpha-square", "alphabet-arabic",
    "alphabet-bangla", "alphabet-chinese", "alphabet-greek", "alphabet-hebrew", "alphabet-hindi",
    "alphabet-japanese", "alphabet-korean", "alphabet-thai", "ambulance", "american-football",
    "amie", "ampersand", "ampersand-circle", "ampersand-square", "analyse", "analytics-01",
    "analytics-02", "analytics-up", "anchor", "android", "angel", "angle", "angle-01",
    "angry", "angry-bird", "angular", "animation", "ant", "antenna", "anti-virus",
    "anxiety", "any-desk", "apologize", "app-store", "apple", "apple-01", "apple-finder",
    "apple-news", "apple-pie", "apple-reminder", "apple-stocks", "apple-vision-pro", "approximately-equal",
    "approximately-equal-circle", "approximately-equal-square", "apricot", "apron", "arc-browser",
    "archer", "archive", "archive-01", "archive-02", "archived", "area-chart", "arithmetic",
    "armchair", "armor", "arrow-all-direction", "arrow-data-transfer-diagonal", "arrow-data-transfer-horizontal",
    "arrow-data-transfer-vertical", "arrow-diagonal", "arrow-down-01", "arrow-down-02", "arrow-down-03",
    "arrow-down-04", "arrow-down-05", "arrow-down-double", "arrow-down-left-01", "arrow-down-left-02",
    "arrow-down-right-01", "arrow-down-right-02", "arrow-expand", "arrow-expand-01", "arrow-expand-02",
    "arrow-expand-diagonal-01", "arrow-expand-diagonal-02", "arrow-horizontal", "arrow-left-01",
    "arrow-left-02", "arrow-left-03", "arrow-left-04", "arrow-left-05", "arrow-left-double",
    "arrow-left-right", "arrow-move-down-left", "arrow-move-down-right", "arrow-move-left-down",
    "arrow-move-right-down", "arrow-move-up-left", "arrow-move-up-right", "arrow-reload-horizontal",
    "arrow-reload-vertical", "arrow-right-01", "arrow-right-02", "arrow-right-03", "arrow-right-04",
    "arrow-right-05", "arrow-right-double", "arrow-shrink", "arrow-shrink-01", "arrow-shrink-02",
    "arrow-turn-backward", "arrow-turn-down", "arrow-turn-forward", "arrow-turn-up", "arrow-up-01",
    "arrow-up-02", "arrow-up-03", "arrow-up-04", "arrow-up-05", "arrow-up-double", "arrow-up-down",
    "arrow-up-left-01", "arrow-up-left-02", "arrow-up-right-01", "arrow-up-right-02", "arrow-vertical",
    "artboard", "artboard-tool", "article", "aspect-ratio", "assignments", "asteroid-01",
    "asteroid-02", "astronaut-01", "astronaut-02", "at", "atm-01", "atm-02", "atom-01",
    "atom-02", "atomic-power", "attachment-01", "attachment-02", "attachment-circle", "attachment-square",
    "auction", "audio-book-01", "audio-book-02", "audio-book-03", "audio-book-04", "audit-01",
    "audit-02", "augmented-reality-ar", "authorized", "auto-conversations", "avalanche", "avocado",
    "award-01", "award-02", "award-03", "award-04", "award-05", "baby-01", "baby-02",
    "baby-bed-01", "baby-bed-02", "baby-bottle", "baby-boy-dress", "baby-girl-dress", "backpack-01",
    "backpack-02", "backpack-03", "backward-01", "backward-02", "bacteria", "badminton",
    "badminton-shuttle", "banana", "bandage", "bangladesh", "bank", "bar-code-01", "bar-code-02",
    "barns", "baseball", "baseball-bat", "baseball-helmet", "basketball-01", "basketball-02",
    "basketball-hoop", "bathtub-01", "bathtub-02", "battery-charging-01", "battery-charging-02",
    "battery-eco", "battery-empty", "battery-full", "battery-low", "battery-medium-01",
    "battery-medium-02", "beach", "beach-02", "beater", "bebo", "bed", "bed-bunk",
    "bed-double", "bed-single-01", "bed-single-02", "bedug-01", "bedug-02", "behance-01",
    "behance-02", "belt", "bend-tool", "berlin", "berlin-tower", "beta", "bicycle",
    "bicycle-01", "billiard-01", "billiard-02", "binary-code", "bing", "bio-energy",
    "biomass-energy", "birthday-cake", "biscuit", "bitcoin", "bitcoin-01", "bitcoin-02",
    "bitcoin-03", "bitcoin-04", "bitcoin-bag", "bitcoin-circle", "bitcoin-cloud", "bitcoin-cpu",
    "bitcoin-credit-card", "bitcoin-database", "bitcoin-down-01", "bitcoin-down-02", "bitcoin-ellipse",
    "bitcoin-eye", "bitcoin-filter", "bitcoin-flashdisk", "bitcoin-graph", "bitcoin-invoice",
    "bitcoin-key", "bitcoin-location", "bitcoin-lock", "bitcoin-love", "bitcoin-mail",
    "bitcoin-mind", "bitcoin-money-01", "bitcoin-money-02", "bitcoin-pie-chart", "bitcoin-piggy-bank",
    "bitcoin-presentation", "bitcoin-receipt", "bitcoin-receive", "bitcoin-rectangle", "bitcoin-safe",
    "bitcoin-search", "bitcoin-send", "bitcoin-setting", "bitcoin-shield", "bitcoin-shopping",
    "bitcoin-smartphone-01", "bitcoin-smartphone-02", "bitcoin-square", "bitcoin-store", "bitcoin-tag",
    "bitcoin-target", "bitcoin-transaction", "bitcoin-up-01", "bitcoin-up-02", "bitcoin-wallet",
    "black-hole", "blend", "blender", "blockchain-01", "blockchain-02", "blockchain-03",
    "blockchain-04", "blockchain-05", "blockchain-06", "blockchain-07", "blogger", "blood",
    "blood-bag", "blood-bottle", "blood-pressure", "blood-type", "bluetooth", "bluetooth-circle",
    "bluetooth-not-connected", "bluetooth-search", "bluetooth-square", "blur", "blush-brush-01",
    "blush-brush-02", "board-math", "boat", "body-armor", "body-part-leg", "body-part-muscle",
    "body-part-six-pack", "body-soap", "body-weight", "bomb", "bone-01", "bone-02",
    "book-01", "book-02", "book-03", "book-04", "book-bookmark-01", "book-bookmark-02",
    "book-download", "book-edit", "book-open-01", "book-open-02", "book-upload", "bookmark-01",
    "bookmark-02", "bookmark-03", "bookmark-add-01", "bookmark-add-02", "bookmark-block-01",
    "bookmark-block-02", "bookmark-check-01", "bookmark-check-02", "bookmark-minus-01", "bookmark-minus-02",
    "bookmark-off-01", "bookmark-off-02", "bookmark-remove-01", "bookmark-remove-02", "books-01",
    "books-02", "bookshelf-01", "bookshelf-02", "bookshelf-03", "bootstrap", "border-all-01",
    "border-all-02", "border-bottom-01", "border-bottom-02", "border-full", "border-horizontal",
    "border-inner", "border-left-01", "border-left-02", "border-none-01", "border-none-02",
    "border-right-01", "border-right-02", "border-top-01", "border-top-02", "border-vertical",
    "borobudur", "bot", "bounce-left", "bounce-right", "bounding-box", "bow-tie",
    "bowling", "bowling-pins", "boxer", "boxing-glove", "brain", "brain-01",
    "brain-02", "brandfetch", "bread-01", "bread-02", "bread-03", "bread-04",
    "breast-pump", "bridge", "briefcase-01", "briefcase-02", "briefcase-03", "briefcase-04",
    "briefcase-05", "briefcase-06", "briefcase-07", "briefcase-08", "briefcase-09", "briefcase-dollar",
    "broccoli", "brochure", "broken-bone", "browser", "brush", "bubble-chat",
    "bubble-chat-add", "bubble-chat-blocked", "bubble-chat-cancel", "bubble-chat-delay", "bubble-chat-done",
    "bubble-chat-download", "bubble-chat-edit", "bubble-chat-favourite", "bubble-chat-income", "bubble-chat-lock",
    "bubble-chat-notification", "bubble-chat-preview", "bubble-chat-question", "bubble-chat-search", "bubble-chat-secure",
    "bubble-chat-translate", "bubble-chat-unlock", "bubble-chat-upload", "bubble-tea-01", "bubble-tea-02",
    "bug-01", "bug-02", "building-01", "building-02", "building-03", "building-04",
    "building-05", "building-06", "bulb", "bulb-charging", "bulletproof-vest", "burj-al-arab",
    "burning-cd", "bus-01", "bus-02", "bus-03", "business-location", "button-01",
    "button-02", "buy-online", "cabin", "cabinet-01", "cabinet-02", "cabinet-03",
    "cabinet-04", "cable-car", "cactus", "cactus-01", "cafe", "calculate",
    "calculator", "calculator-01", "calendar-01", "calendar-02", "calendar-03", "calendar-04",
    "calendar-add-01", "calendar-add-02", "calendar-block-01", "calendar-block-02", "calendar-check-in-01",
    "calendar-check-in-02", "calendar-check-out-01", "calendar-check-out-02", "calendar-download-01",
    "calendar-download-02", "calendar-favorite-01", "calendar-favorite-02", "calendar-lock-01", "calendar-lock-02",
    "calendar-love-01", "calendar-love-02", "calendar-minus-01", "calendar-minus-02", "calendar-remove-01",
    "calendar-remove-02", "calendar-setting-01", "calendar-setting-02", "calendar-upload-01", "calendar-upload-02",
    "call", "call-add", "call-blocked", "call-disabled", "call-done", "call-end-01",
    "call-end-02", "call-end-03", "call-end-04", "call-incoming-01", "call-incoming-02",
    "call-incoming-03", "call-internal", "call-locked", "call-minus", "call-missed-01",
    "call-missed-02", "call-missed-03", "call-missed-04", "call-outgoing-01", "call-outgoing-02",
    "call-outgoing-03", "call-paused", "call-received", "call-ringing-01", "call-ringing-02",
    "call-ringing-03", "call-unlocked", "camel", "camera-01", "camera-02", "camera-add-01",
    "camera-add-02", "camera-automatically-01", "camera-automatically-02", "camera-lens", "camera-microphone-01",
    "camera-microphone-02", "camera-night-mode-01", "camera-night-mode-02", "camera-off-01", "camera-off-02",
    "camera-rotated-01", "camera-rotated-02", "camera-smile-01", "camera-smile-02", "camera-tripod",
    "camera-video", "camper", "campfire", "cancel-01", "cancel-02", "cancel-circle",
    "cancel-circle-half-dot", "cancel-square", "candelier-01", "candelier-02", "canvas",
    "cap", "cap-projecting", "cap-round", "cap-straight", "capcut", "capcut-rectangle",
    "car-01", "car-02", "car-03", "car-04", "car-parking-01", "car-parking-02",
    "caravan", "carbon-credits", "card-exchange-01", "card-exchange-02", "cardigan", "cardiogram-01",
    "cardiogram-02", "care", "career", "cargo-ship", "carousel-horizontal", "carousel-horizontal-02",
    "carousel-vertical", "carrot", "cash-01", "cash-02", "cashier", "cashier-02",
    "castle", "castle-01", "castle-02", "catalogue", "caution-tape", "cave",
    "cc-license", "cd", "cells", "cellular-network", "cellular-network-offline", "celsius",
    "center-focus", "central-shaheed-minar", "centralized", "certificate-01", "certificate-02", "chair-01",
    "chair-02", "chair-03", "chair-04", "chair-05", "chair-barber", "champion",
    "change-screen-mode", "character-phonetic", "charity", "chart", "chart-average", "chart-bar-line",
    "chart-breakout-circle", "chart-breakout-square", "chart-bubble-01", "chart-bubble-02", "chart-column",
    "chart-decrease", "chart-evaluation", "chart-high-low", "chart-histogram", "chart-increase",
    "chart-line-data-01", "chart-line-data-02", "chart-line-data-03", "chart-maximum", "chart-medium",
    "chart-minimum", "chart-pie-01", "chart-pie-02", "chart-pie-03", "chart-pie-04",
    "chart-radar", "chart-relationship", "chart-ring", "chart-rose", "chart-scatter",
    "chat-bot", "chat-gpt", "chatting-01", "check-list", "checkmark-01", "checkmark-02",
    "checkmark-badge-01", "checkmark-badge-02", "checkmark-circle-01", "checkmark-circle-02", "checkmark-square-01",
    "checkmark-square-02", "cheese", "cheese-cake-01", "cheese-cake-02", "chef", "chef-hat",
    "chemistry-01", "chemistry-02", "chemistry-03", "cherry", "chess-01", "chess-02",
    "chess-pawn", "chicken-thighs", "chimney", "china-temple", "chip", "chip-02",
    "chocolate", "chrome", "chrysler", "church", "cinnamon-roll", "circle",
    "circle-arrow-data-transfer-diagonal", "circle-arrow-data-transfer-horizontal", "circle-arrow-data-transfer-vertical",
    "circle-arrow-diagonal-01", "circle-arrow-diagonal-02", "circle-arrow-down-01", "circle-arrow-down-02",
    "circle-arrow-down-03", "circle-arrow-down-double", "circle-arrow-down-left", "circle-arrow-down-right",
    "circle-arrow-expand-01", "circle-arrow-expand-02", "circle-arrow-horizontal", "circle-arrow-left-01",
    "circle-arrow-left-02", "circle-arrow-left-03", "circle-arrow-left-double", "circle-arrow-left-right",
    "circle-arrow-reload-01", "circle-arrow-reload-02", "circle-arrow-right-01", "circle-arrow-right-02",
    "circle-arrow-right-03", "circle-arrow-right-double", "circle-arrow-shrink-01", "circle-arrow-shrink-02",
    "circle-arrow-up-01", "circle-arrow-up-02", "circle-arrow-up-03", "circle-arrow-up-double",
    "circle-arrow-up-down", "circle-arrow-up-left", "circle-arrow-up-right", "circle-arrow-vertical",
    "circle-lock-01", "circle-lock-02", "circle-lock-add-01", "circle-lock-add-02", "circle-lock-check-01",
    "circle-lock-check-02", "circle-lock-minus-01", "circle-lock-minus-02", "circle-lock-remove-01",
    "circle-lock-remove-02", "circle-password", "circle-unlock-01", "circle-unlock-02", "city-01",
    "city-02", "city-03", "clapping-01", "clapping-02", "clean", "cleaning-bucket",
    "clinic", "clip", "clipboard", "clock-01", "clock-02", "clock-03",
    "clock-04", "clock-05", "close-circle", "close-square", "clothes", "cloud",
    "cloud-angled-rain", "cloud-angled-rain-zap", "cloud-angled-zap", "cloud-big-rain", "cloud-download",
    "cloud-fast-wind", "cloud-hailstone", "cloud-little-rain", "cloud-little-snow", "cloud-loading",
    "cloud-mid-rain", "cloud-mid-snow", "cloud-slow-wind", "cloud-snow", "cloud-upload",
    "clubs-01", "clubs-02", "co-present", "coach", "coal", "coat-hanger-01",
    "coat-hanger-02", "codesandbox", "coding", "coffee-01", "coffee-02", "coffee-beans",
    "coins-01", "coins-02", "coins-bitcoin", "coins-dollar", "coins-euro", "coins-pound",
    "coins-swap", "coins-yen", "collections-bookmark", "color-picker", "colors", "colosseum",
    "column-delete", "column-insert", "coma", "comb", "coming-soon-01", "coming-soon-02",
    "command", "command-line", "comment-01", "comment-02", "comment-add-01", "comment-add-02",
    "comment-block-01", "comment-block-02", "comment-remove-01", "comment-remove-02", "compass",
    "compass-01", "complaint", "computer", "computer-add", "computer-check", "computer-cloud",
    "computer-desk-01", "computer-desk-02", "computer-desk-03", "computer-dollar", "computer-phone-sync",
    "computer-programming-01", "computer-programming-02", "computer-protection", "computer-remove", "computer-settings",
    "computer-video", "computer-video-call", "cone-01", "cone-02", "conference", "configuration-01",
    "configuration-02", "confused", "congruent-to", "congruent-to-circle", "congruent-to-square",
    "connect", "console", "constellation", "contact", "contact-01", "contact-02",
    "contact-book", "container-truck", "container-truck-01", "container-truck-02", "conversation",
    "cook-book", "cookie", "coordinate-01", "coordinate-02", "copilot", "copy-01",
    "copy-02", "copy-link", "copyright", "corn", "corporate", "cos",
    "cosine-01", "cosine-02", "cottage", "cotton-candy", "coupon-01", "coupon-02",
    "coupon-03", "coupon-percent", "course", "court-house", "court-law", "covariate",
    "covid-info", "cowboy-hat", "cpu", "cpu-charge", "cpu-settings", "crab",
    "crane", "crazy", "creative-market", "credit-card", "credit-card-accept", "credit-card-add",
    "credit-card-change", "credit-card-defualt", "credit-card-edit", "credit-card-freeze", "credit-card-not-accept",
    "credit-card-not-found", "credit-card-pos", "credit-card-validation", "cricket-bat", "cricket-helmet",
    "croissant", "crop", "crown", "crying", "csv-01", "csv-02",
    "cube", "cupcake-01", "cupcake-02", "cupcake-03", "curling", "cursor-01",
    "cursor-02", "cursor-add-selection-01", "cursor-add-selection-02", "cursor-circle-selection-01", "cursor-circle-selection-02",
    "cursor-disabled-01", "cursor-disabled-02", "cursor-edit-01", "cursor-edit-02", "cursor-hold-01",
    "cursor-hold-02", "cursor-in-window", "cursor-info-01", "cursor-info-02", "cursor-loading-01",
    "cursor-loading-02", "cursor-magic-selection-01", "cursor-magic-selection-02", "cursor-move-01", "cursor-move-02",
    "cursor-pointer-01", "cursor-pointer-02", "cursor-progress-01", "cursor-progress-02", "cursor-progress-03",
    "cursor-progress-04", "cursor-rectangle-selection-01", "cursor-rectangle-selection-02", "cursor-remove-selection-01",
    "cursor-remove-selection-02", "cursor-text", "curtains", "curve-arrow-down-01", "curve-arrow-down-02",
    "curve-arrow-left-01", "curve-arrow-left-02", "curve-arrow-right-01", "curve-arrow-right-02", "curve-arrow-up-01",
    "curve-arrow-up-02", "customer-service", "customer-service-01", "customer-service-02", "customer-support",
    "customize", "cylinder-01", "cylinder-02", "cylinder-03", "cylinder-04", "danger",
    "dart", "dashboard-browsing", "dashboard-circle", "dashboard-circle-add", "dashboard-circle-edit",
    "dashboard-circle-remove", "dashboard-circle-settings", "dashboard-speed-01", "dashboard-speed-02", "dashboard-square-01",
    "dashboard-square-02", "dashboard-square-03", "dashboard-square-add", "dashboard-square-edit", "dashboard-square-remove",
    "dashboard-square-setting", "dashed-line-01", "dashed-line-02", "data-recovery", "database",
    "database-01", "database-02", "database-add", "database-export", "database-import",
    "database-locked", "database-restore", "database-setting", "database-sync", "database-sync-01",
    "dates", "dead", "delete-01", "delete-02", "delete-03", "delete-04",
    "delete-column", "delete-put-back", "delete-row", "delete-throw", "delivered-sent", "delivery-box-01",
    "delivery-box-02", "delivery-delay-01", "delivery-delay-02", "delivery-return-01", "delivery-return-02",
    "delivery-secure-01", "delivery-secure-02", "delivery-sent-01", "delivery-sent-02", "delivery-tracking-01",
    "delivery-tracking-02", "delivery-truck-01", "delivery-truck-02", "delivery-view-01", "delivery-view-02",
    "dental-braces", "dental-broken-tooth", "dental-care", "dental-tooth", "departement", "desert",
    "desk", "desk-01", "desk-02", "developer", "deviantart", "diagonal-scroll-point-01",
    "diagonal-scroll-point-02", "dialpad-circle-01", "dialpad-circle-02", "dialpad-square-01", "dialpad-square-02",
    "diameter", "diamond", "diamond-01", "diamond-02", "diaper", "dice-faces-01",
    "dice-faces-02", "dice-faces-03", "dice-faces-04", "dice-faces-05", "dice-faces-06",
    "digestion", "digg", "digital-clock", "dim-sum-01", "dim-sum-02", "dining-table",
    "diploma", "direction-left-01", "direction-left-02", "direction-right-01", "direction-right-02",
    "directions-01", "directions-02", "dirham", "disability-01", "disability-02", "discord",
    "discount", "discount-01", "discount-tag-01", "discount-tag-02", "discover", "dish-01",
    "dish-02", "dish-washer", "displeased", "distribute-horizontal-center", "distribute-horizontal-left",
    "distribute-horizontal-right", "distribute-vertical-bottom", "distribute-vertical-center", "distribute-vertical-top",
    "distribution", "divide-sign", "divide-sign-circle", "divide-sign-square", "dna", "dna-01",
    "do-not-touch-01", "do-not-touch-02", "doc-01", "doc-02", "doctor-01", "doctor-02",
    "doctor-03", "document-attachment", "document-code", "document-validation", "dollar-01", "dollar-02",
    "dollar-circle", "dollar-receive-01", "dollar-receive-02", "dollar-send-01", "dollar-send-02",
    "dollar-square", "dome", "domino", "door", "door-01", "door-02",
    "door-lock", "doughnut", "download-01", "download-02", "download-03", "download-04",
    "download-05", "download-circle-01", "download-circle-02", "download-square-01", "download-square-02",
    "drag-01", "drag-02", "drag-03", "drag-04", "drag-drop", "drag-drop-horizontal",
    "drag-drop-vertical", "drag-left-01", "drag-left-02", "drag-left-03", "drag-left-04",
    "drag-right-01", "drag-right-02", "drag-right-03", "drag-right-04", "drawing-compass",
    "drawing-mode", "dress-01", "dress-02", "dress-03", "dress-04", "dress-05",
    "dress-06", "dress-07", "dribble", "drill", "drink", "drone", "drooling",
    "dropbox", "droplet", "droppers", "ds3-tool", "dua", "dumbbell-01",
    "dumbbell-02", "dumbbell-03", "ear", "ear-rings-01", "ear-rings-02", "ear-rings-03",
    "earth", "easel", "east-direction", "easy", "eat", "eclipse",
    "edit-01", "edit-02", "edit-off", "edit-road", "edit-table", "edit-user-02",
    "eggs", "eid-mubarak", "eiffel-tower", "election", "electric-home-01", "electric-home-02",
    "electric-plugs", "electric-tower-01", "electric-tower-02", "electric-wire", "ellipse-selection",
    "energy", "energy-ellipse", "energy-rectangle", "entering-geo-fence", "equalizer", "equipment-bench-press",
    "equipment-chest-press", "equipment-gym-01", "equipment-gym-02", "equipment-gym-03", "equipment-weightlifting",
    "eraser", "eraser-01", "eraser-add", "eraser-auto", "estimate-01", "estimate-02",
    "ethereum", "ethereum-ellipse", "ethereum-rectangle", "euro", "euro-circle", "euro-receive",
    "euro-send", "euro-square", "ev-charging", "evil", "exchange-01", "exchange-02",
    "exchange-03", "expander", "external-drive", "eye", "facebook", "facebook-01",
    "factory", "factory-01", "factory-02", "fahrenheit", "falling-star", "fast-wind",
    "favourite", "favourite-circle", "favourite-square", "fax", "feather", "fencing",
    "fencing-mask", "ferris-wheel", "ferry-boat", "figma", "file-01", "file-02",
    "file-add", "file-attachment", "file-audio", "file-bitcoin", "file-block", "file-bookmark",
    "file-cloud", "file-corrupt", "file-dollar", "file-download", "file-edit", "file-euro",
    "file-export", "file-favourite", "file-import", "file-link", "file-locked", "file-management",
    "file-minus", "file-music", "file-not-found", "file-paste", "file-pin", "file-pound",
    "file-remove", "file-script", "file-search", "file-security", "file-shredder", "file-star",
    "file-sync", "file-unknown", "file-unlocked", "file-upload", "file-validation", "file-verified",
    "file-video", "file-view", "file-yen", "file-zip", "film-01", "film-02",
    "film-roll-01", "film-roll-02", "filter", "filter-add", "filter-edit", "filter-horizontal",
    "filter-mail-circle", "filter-mail-square", "filter-remove", "filter-reset", "filter-vertical",
    "fingerprint", "fingerprint-scan", "fins", "fire", "fire-pit", "fire-security",
    "firewall", "first-aid-kit", "fish-food", "fiverr", "flag-01", "flag-02",
    "flag-03", "flash", "flash-off", "flaticon", "flickr", "flim-slate",
    "flip-bottom", "flip-horizontal", "flip-left", "flip-phone", "flip-right", "flip-top",
    "flip-vertical", "floor-plan", "floppy-disk", "flow", "flow-circle", "flow-connection",
    "flow-square", "flowchart-01", "flowchart-02", "flower-pot", "flushed", "focus-point",
    "folder-01", "folder-02", "folder-03", "folder-add", "folder-attachment", "folder-audio",
    "folder-block", "folder-check", "folder-cloud", "folder-details", "folder-details-reference",
    "folder-download", "folder-edit", "folder-export", "folder-favourite", "folder-file-storage",
    "folder-import", "folder-library", "folder-links", "folder-locked", "folder-management",
    "folder-minus", "folder-music", "folder-open", "folder-pin", "folder-remove", "folder-search",
    "folder-security", "folder-shared-01", "folder-shared-02", "folder-shared-03", "folder-sync",
    "folder-transfer", "folder-unknown", "folder-unlocked", "folder-upload", "folder-video",
    "folder-view", "folder-zip", "folders", "football", "football-pitch", "fork-restaurant",
    "forward-01", "forward-02", "four-finger-02", "four-finger-03", "foursquare", "framer",
    "frameworks", "french-fries-01", "french-fries-02", "fridge", "fry", "fuel-01",
    "fuel-02", "fuel-station", "function", "function-circle", "function-of-x", "function-square",
    "galaxy", "game", "game-controller-01", "game-controller-02", "game-controller-03", "gameboy",
    "garage", "garbage-truck", "gas-pipe", "gas-stove", "gem", "geology-crust",
    "geometric-shapes-01", "geometric-shapes-02", "gibbous-moon", "gif-01", "gif-02",
    "gift", "gift-card", "git-branch", "git-commit", "git-compare", "git-fork",
    "git-merge", "git-pull-request", "git-pull-request-closed", "git-pull-request-draft", "gitbook",
    "github", "github-01", "gitlab", "give-blood", "give-pill", "glasses",
    "global", "global-editing", "globe", "globe-02", "glove", "go-backward-10-sec",
    "go-backward-15-sec", "go-backward-30-sec", "go-backward-5-sec", "go-backward-60-sec", "go-forward-10-sec",
    "go-forward-15-sec", "go-forward-30-sec", "go-forward-5-sec", "go-forward-60-sec", "gold",
    "gold-ingots", "golf-ball", "golf-bat", "golf-cart", "golf-hole", "google",
    "google-doc", "google-drive", "google-gemini", "google-home", "google-maps", "google-sheet",
    "gps-01", "gps-02", "gps-disconnected", "gps-off-01", "gps-off-02", "gps-signal-01",
    "gps-signal-02", "graduate-female", "graduate-male", "graduation-scroll", "grapes", "graph-up-arrow",
    "graphic-design", "grass", "grave", "grease-gun", "greater-than", "greater-than-circle",
    "greater-than-square", "greek-helmet", "green-house", "grid", "grid-off", "grid-table",
    "grid-view", "grimacing", "grinning", "grok", "group-items", "group-layers",
    "guest-house", "gun", "gymnastics", "gymnastics-rings", "hackerrank", "hair-clips",
    "hair-dryer", "haji", "halal", "hamburger-01", "hamburger-02", "hand-bag-01",
    "hand-bag-02", "hand-beater", "hand-grip", "hand-pointing-down-01", "hand-pointing-down-02",
    "hand-pointing-down-03", "hand-pointing-down-04", "hand-pointing-left-01", "hand-pointing-left-02",
    "hand-pointing-left-03", "hand-pointing-left-04", "hand-pointing-right-01", "hand-pointing-right-02",
    "hand-pointing-right-03", "hand-pointing-right-04", "hand-prayer", "hand-sanitizer", "handshake-01",
    "handshake-02", "handy-man", "hanging-clock", "hangout", "happy", "hard-drive",
    "hdd", "hdr-01", "hdr-02", "heading", "heading-01", "heading-02",
    "heading-03", "heading-04", "heading-05", "heading-06", "headphone-mute", "headphones",
    "health", "heart-add", "heart-check", "heart-remove", "heartbreak", "helicopter",
    "help-circle", "help-square", "hexagon", "hexagon-01", "hierarchy", "hierarchy-circle-01",
    "hierarchy-circle-02", "hierarchy-circle-03", "hierarchy-files", "hierarchy-square-01", "hierarchy-square-02",
    "hierarchy-square-03", "hierarchy-square-04", "hierarchy-square-05", "hierarchy-square-06", "hierarchy-square-07",
    "hierarchy-square-08", "hierarchy-square-10", "high-heels-01", "high-heels-02", "hijab",
    "hockey", "hold-01", "hold-02", "hold-03", "hold-04", "hold-05",
    "hold-locked-01", "hold-locked-02", "hold-phone", "hologram", "home-01", "home-02",
    "home-03", "home-04", "home-05", "home-06", "home-wifi", "honey-01",
    "honey-02", "honor", "honour-star", "hoodie", "horizonal-scroll-point-01", "horizonal-scroll-point-02",
    "horizontal-resize", "hospital-01", "hospital-02", "hospital-bed-01", "hospital-bed-02", "hospital-location",
    "hot-air-balloon", "hot-dog", "hot-price", "hot-tube", "hotspot", "hotspot-offline",
    "hourglass", "hourglass-off", "house-01", "house-02", "house-03", "house-04",
    "house-05", "house-solar-panel", "html-5", "humidity", "hut", "ice-cream-01",
    "ice-cream-02", "ice-cream-03", "ice-cream-04", "ice-hockey", "ice-skating",
    "ico", "iconjar", "id", "id-verified", "idea", "identification",
    "image-01", "image-02", "image-add-01", "image-add-02", "image-composition", "image-composition-oval",
    "image-crop", "image-delete-01", "image-delete-02", "image-done-01", "image-done-02",
    "image-download", "image-download-02", "image-not-found-01", "image-not-found-02", "image-remove-01",
    "image-remove-02", "image-upload", "image-upload-01", "imo", "important-book", "in-love",
    "inbox", "inbox-check", "inbox-download", "inbox-unread", "inbox-upload", "incognito",
    "increase-level", "india-gate", "inequality-01", "inequality-02", "inequality-circle-01", "inequality-circle-02",
    "inequality-square-01", "inequality-square-02", "infinity-01", "infinity-02", "infinity-circle",
    "infinity-square", "information-circle", "information-diamond", "information-square", "injection",
    "insert-bottom-image", "insert-center-image", "insert-column", "insert-column-left", "insert-pi",
    "insert-row", "insert-row-down", "insert-row-up", "insert-top-image", "inspect-code",
    "instagram", "installing-updates-01", "installing-updates-02", "internet", "internet-antenna-01",
    "internet-antenna-02", "internet-antenna-03", "internet-antenna-04", "intersection", "invalid-card",
    "invoice", "invoice-01", "invoice-02", "invoice-03", "invoice-04", "ipod",
    "iris-scan", "island", "jar", "java", "java-script", "job-link",
    "job-search", "job-share", "jpeg-02", "jpg-01", "jpg-02", "jsx-01",
    "jsx-02", "jsx-03", "justice-scale-01", "justice-scale-02", "kaaba-01", "kaaba-02",
    "kayak", "keffiyeh", "kettle", "kettle-01", "kettlebell", "key-01",
    "key-02", "keyboard", "keyboard-wireless", "keyframe", "keyframe-add", "keyframe-align-center",
    "keyframe-align-horizontal", "keyframe-align-vertical", "keyframe-bottom", "keyframe-left", "keyframe-remove",
    "keyframe-right", "keyframe-top", "keyframes", "keyframes-double", "keyframes-double-remove",
    "keyframes-multiple", "keyframes-multiple-remove", "kickstarter-01", "kickstarter-02", "kid",
    "kidneys", "kissing", "kitchen-utensils", "kite", "knife-01", "knife-02",
    "knife-bread", "knight-shield", "knives", "knowledge-01", "knowledge-02", "kurta",
    "kurta-01", "label", "label-important", "labor", "labs", "lake",
    "lamp", "lamp-01", "lamp-02", "lamp-03", "lamp-04", "lamp-05",
    "language-circle", "language-skill", "language-square", "lantern", "laptop", "laptop-add",
    "laptop-charging", "laptop-check", "laptop-cloud", "laptop-issue", "laptop-performance", "laptop-phone-sync",
    "laptop-programming", "laptop-remove", "laptop-settings", "laptop-video", "lasso-tool-01", "lasso-tool-02",
    "last-fm", "latitude", "laughing", "layers-01", "layers-02", "layers-logo",
    "layout-01", "layout-02", "layout-03", "layout-04", "layout-05", "layout-06",
    "layout-07", "layout-2-column", "layout-2-row", "layout-3-column", "layout-3-row",
    "layout-bottom", "layout-grid", "layout-left", "layout-right", "layout-table-01",
    "layout-table-02", "layout-top", "leaf-01", "leaf-02", "leaf-03", "leaf-04",
    "leaving-geo-fence", "leetcode", "left-angle", "left-to-right-block-quote", "left-to-right-list-bullet",
    "left-to-right-list-dash", "left-to-right-list-number", "left-to-right-list-star", "left-to-right-list-triangle",
    "left-triangle", "legal-01", "legal-02", "legal-document-01", "legal-document-02", "legal-hammer",
    "less-than", "less-than-circle", "less-than-square", "letter-spacing", "letters-a",
    "level-tool", "library", "license", "license-draft", "license-maintenance", "license-no",
    "license-pin", "license-third-party", "lift-truck", "lighthouse", "limitation", "line",
    "line-height", "link-01", "link-02", "link-03", "link-04", "link-05",
    "link-06", "link-backward", "link-circle", "link-circle-02", "link-forward", "link-square-01",
    "link-square-02", "linkedin-01", "linkedin-02", "list-setting", "list-view", "litecoin",
    "liver", "loading-01", "loading-02", "loading-03", "loading-04", "location-01",
    "location-02", "location-03", "location-04", "location-05", "location-06", "location-07",
    "location-08", "location-09", "location-10", "location-add-01", "location-add-02", "location-check-01",
    "location-check-02", "location-favourite-01", "location-favourite-02", "location-offline-01", "location-offline-02",
    "location-remove-01", "location-remove-02", "location-share-01", "location-share-02", "location-star-01",
    "location-star-02", "location-update-01", "location-update-02", "location-user-01", "location-user-02",
    "location-user-03", "location-user-04", "lock", "lock-computer", "lock-key", "lock-sync-01",
    "lock-sync-02", "locked", "locker", "locker-01", "login-01", "login-02",
    "login-03", "login-circle-01", "login-circle-02", "login-method", "login-square-01", "login-square-02",
    "logout-01", "logout-02", "logout-03", "logout-04", "logout-05", "logout-circle-01",
    "logout-circle-02", "logout-square-01", "logout-square-02", "lollipop", "longitude", "look-bottom",
    "look-left", "look-right", "look-top", "loom", "loop", "loupe-01",
    "loupe-02", "lovebird", "lovely", "low-power-01", "low-power-02", "lucas",
    "luge", "lungs", "machine-learning-01", "machine-learning-02", "magic-wand-01", "magic-wand-02",
    "magic-wand-03", "magnet", "magnet-01", "magnet-02", "mail-01", "mail-02",
    "mail-account-01", "mail-account-02", "mail-add-01", "mail-add-02", "mail-at-sign-01",
    "mail-at-sign-02", "mail-block-01", "mail-block-02", "mail-download-01", "mail-download-02",
    "mail-edit-01", "mail-edit-02", "mail-lock-01", "mail-lock-02", "mail-love-01",
    "mail-love-02", "mail-minus-01", "mail-minus-02", "mail-open", "mail-open-01",
    "mail-open-02", "mail-open-love", "mail-receive-01", "mail-receive-02", "mail-remove-01",
    "mail-remove-02", "mail-reply-01", "mail-reply-02", "mail-reply-all-01", "mail-reply-all-02",
    "mail-search-01", "mail-search-02", "mail-secure-01", "mail-secure-02", "mail-send-01",
    "mail-send-02", "mail-setting-01", "mail-setting-02", "mail-unlock-01", "mail-unlock-02",
    "mail-upload-01", "mail-upload-02", "mail-validation-01", "mail-validation-02", "mail-voice-01",
    "mail-voice-02", "mailbox", "mailbox-01", "manager", "map-pin", "map-pinpoint-01",
    "map-pinpoint-02", "mapping", "maps", "maps-circle-01", "maps-circle-02", "maps-editing",
    "maps-global-01", "maps-global-02", "maps-location-01", "maps-location-02", "maps-off",
    "maps-refresh", "maps-search", "maps-square-01", "maps-square-02", "mask", "mask-love",
    "master-card", "matches", "math", "matrix", "maximize-01", "maximize-02",
    "maximize-03", "maximize-04", "maximize-screen", "mayan-pyramid", "maze", "medal-01",
    "medal-02", "medal-03", "medal-04", "medal-05", "medal-06", "medal-07",
    "medal-first-place", "medal-second-place", "medal-third-place", "medical-file", "medical-mask",
    "medicine-01", "medicine-02", "medicine-bottle-01", "medicine-bottle-02", "medicine-syrup",
    "medium", "medium-square", "meetup-01", "meetup-02", "megaphone-01", "megaphone-02",
    "meh", "mentor", "mentoring", "menu-01", "menu-02", "menu-03",
    "menu-04", "menu-05", "menu-06", "menu-07", "menu-08", "menu-09",
    "menu-10", "menu-11", "menu-circle", "menu-restaurant", "menu-square", "message-01",
    "message-02", "message-add-01", "message-add-02", "message-blocked", "message-cancel-01",
    "message-cancel-02", "message-delay-01", "message-delay-02", "message-done-01", "message-done-02",
    "message-download-01", "message-download-02", "message-edit-01", "message-edit-02", "message-favourite-01",
    "message-favourite-02", "message-incoming-01", "message-incoming-02", "message-lock-01", "message-lock-02",
    "message-multiple-01", "message-multiple-02", "message-notification-01", "message-notification-02", "message-outgoing-01",
    "message-outgoing-02", "message-preview-01", "message-preview-02", "message-programming", "message-question",
    "message-search-01", "message-search-02", "message-secure-01", "message-secure-02", "message-translate",
    "message-unlock-01", "message-unlock-02", "message-upload-01", "message-upload-02", "message-user-01",
    "message-user-02", "messenger", "meta", "metro", "mic-01", "mic-02",
    "mic-off-01", "mic-off-02", "microsoft", "microsoft-admin", "microwave", "milk-bottle",
    "milk-carton", "milk-coconut", "milk-oat", "minimize-01", "minimize-02", "minimize-03",
    "minimize-04", "minimize-screen", "mining-01", "mining-02", "mining-03", "minus-plus-01",
    "minus-plus-02", "minus-plus-circle-01", "minus-plus-circle-02", "minus-plus-square-01", "minus-plus-square-02",
    "minus-sign", "minus-sign-circle", "minus-sign-square", "mirror", "mirroring-screen",
    "mixer", "mobile-navigator-01", "mobile-navigator-02", "mobile-programming-01", "mobile-programming-02",
    "mobile-protection", "mobile-security", "mochi", "modern-tv", "modern-tv-4-k",
    "modern-tv-issue", "molecules", "monas", "money-01", "money-02", "money-03",
    "money-04", "money-add-01", "money-add-02", "money-bag-01", "money-bag-02",
    "money-exchange-01", "money-exchange-02", "money-exchange-03", "money-not-found-01", "money-not-found-02",
    "money-not-found-03", "money-not-found-04", "money-receive-01", "money-receive-02", "money-receive-circle",
    "money-receive-flow-01", "money-receive-flow-02", "money-receive-square", "money-remove-01", "money-remove-02",
    "money-safe", "money-security", "money-send-01", "money-send-02", "money-send-circle",
    "money-send-flow-01", "money-send-flow-02", "money-send-square", "monocle", "monocle-01",
    "monster", "moon", "moon-01", "moon-02", "moon-angled-rain-zap", "moon-cloud",
    "moon-cloud-angled-rain", "moon-cloud-angled-zap", "moon-cloud-big-rain", "moon-cloud-fast-wind",
    "moon-cloud-hailstone", "moon-cloud-little-rain", "moon-cloud-little-snow", "moon-cloud-mid-rain",
    "moon-cloud-mid-snow", "moon-cloud-slow-wind", "moon-cloud-snow", "moon-eclipse", "moon-fast-wind",
    "moon-landing", "moon-slow-wind", "moonset", "more-01", "more-02", "more-03",
    "more-horizontal", "more-horizontal-circle-01", "more-horizontal-circle-02", "more-horizontal-square-01",
    "more-horizontal-square-02", "more-or-less", "more-or-less-circle", "more-or-less-square",
    "more-vertical", "more-vertical-circle-01", "more-vertical-circle-02", "more-vertical-square-01",
    "more-vertical-square-02", "mortar", "mortarboard-01", "mortarboard-02", "mosque-01",
    "mosque-02", "mosque-03", "mosque-04", "mosque-05", "mosque-location", "motion-01",
    "motion-02", "motorbike-01", "motorbike-02", "mountain", "mouse-01", "mouse-02",
    "mouse-03", "mouse-04", "mouse-05", "mouse-06", "mouse-07", "mouse-08",
    "mouse-09", "mouse-10", "mouse-11", "mouse-12", "mouse-13", "mouse-14",
    "mouse-15", "mouse-16", "mouse-17", "mouse-18", "mouse-19", "mouse-20",
    "mouse-21", "mouse-22", "mouse-23", "move", "move-01", "move-02",
    "move-bottom", "move-left", "move-right", "move-to", "move-top", "mp3-01",
    "mp3-02", "mp4-01", "mp4-02", "muhammad", "multiplication-sign", "multiplication-sign-circle",
    "multiplication-sign-square", "mushroom", "mushroom-01", "music-01", "music-02", "music-note-01",
    "music-note-02", "music-note-03", "music-note-04", "music-note-square-01", "music-note-square-02",
    "muslim", "mute", "my-location", "nail", "name-tag", "nano-technology",
    "natural-food", "navigation-01", "navigation-02", "navigation-03", "navigation-04", "navigation-05",
    "navigation-06", "near-me", "necklace", "nerd", "neutral", "new-job",
    "new-office", "new-releases", "new-twitter", "new-twitter-ellipse", "new-twitter-rectangle",
    "news", "news-01", "newspaper", "next", "nike", "nintendo", "nintendo-switch",
    "nlp", "node-add", "node-edit", "node-move-down", "node-move-up", "node-remove",
    "noodles", "nose", "not-equal-sign", "not-equal-sign-circle", "not-equal-sign-square",
    "note", "note-01", "note-02", "note-03", "note-04", "note-05",
    "note-add", "note-done", "note-edit", "note-remove", "notebook", "notebook-01",
    "notebook-02", "notification-01", "notification-02", "notification-03", "notification-block-01",
    "notification-block-02", "notification-block-03", "notification-bubble", "notification-circle",
    "notification-off-01", "notification-off-02", "notification-off-03", "notification-snooze-01",
    "notification-snooze-02", "notification-snooze-03", "notification-square", "notion-01", "notion-02",
    "npm", "nuclear-power", "nut", "obtuse-angle", "octagon", "octopus",
    "office", "office-365", "office-chair", "oil-barrel", "ok-finger", "olympic-torch",
    "online-learning-01", "online-learning-02", "online-learning-03", "online-learning-04", "open-caption",
    "option", "orange", "orbit-01", "orbit-02", "organic-food", "organization-01",
    "organization-02", "ornament", "orphan", "ostrich", "otter", "outgoing-call-01",
    "outgoing-call-02", "oven", "package", "package-add", "package-delivered", "package-moving",
    "package-open", "package-out-of-stock", "package-process", "package-receive", "package-remove",
    "package-search", "package-sent", "pacman-01", "pacman-02", "page-not-found", "paint-board",
    "paint-brush-01", "paint-brush-02", "paint-brush-03", "paint-brush-04", "paint-bucket",
    "pan-01", "pan-02", "pan-03", "panda", "panel-bottom", "panel-left",
    "panel-right", "panel-top", "pants", "papaya", "paper-plane-01", "paper-plane-02",
    "paperclip", "parachute", "paragraph", "paragraph-bullets-point-01", "paragraph-bullets-point-02",
    "paragraph-spacing", "parallelogram", "park-bench", "parking-area-circle", "parking-area-square",
    "passport", "passport-01", "passport-valid", "password-validation", "path", "pathfinder-crop",
    "pathfinder-divide", "pathfinder-exclude", "pathfinder-intersect", "pathfinder-merge", "pathfinder-minus-back",
    "pathfinder-minus-front", "pathfinder-outline", "pathfinder-trim", "pathfinder-unite", "patient",
    "patriot", "pause", "pavilon", "pay-by-check", "payment-01", "payment-02",
    "payment-success-01", "payment-success-02", "payoneer", "paypal", "pdf-01", "pdf-02",
    "peace", "pen-connect-bluetooth", "pen-connect-usb", "pen-connect-wifi", "pen-tool-01",
    "pen-tool-02", "pen-tool-03", "pen-tool-add", "pen-tool-minus", "pencil", "pencil-edit-01",
    "pencil-edit-02", "pendulum", "pensive", "pentagon", "pentagon-01", "percent",
    "percent-circle", "percent-square", "perfume", "periscope", "permanent-job", "perspective",
    "petals-01", "petals-02", "petals-03", "pexels", "phone-01", "phone-02",
    "phone-off-01", "phone-off-02", "php", "physics", "pi", "pi-circle",
    "pi-square", "pick-up-01", "pick-up-02", "picture-in-picture-exit", "picture-in-picture-on",
    "pie", "pie-chart", "pie-chart-square", "piggy-bank", "pin", "pin-code",
    "pin-location-01", "pin-location-02", "pin-location-03", "pin-off", "pinterest", "pipeline",
    "pisa-tower", "pizza-01", "pizza-02", "pizza-cutter", "plane", "plant-01",
    "plant-02", "plant-03", "plate", "play", "play-circle", "play-circle-02",
    "play-list", "play-list-add", "play-list-favourite-01", "play-list-favourite-02", "play-list-minus",
    "play-list-remove", "play-square", "play-store", "playlist-01", "playlist-02",
    "playlist-03", "plaza", "plug-01", "plug-02", "plug-socket", "plus-minus",
    "plus-minus-01", "plus-minus-02", "plus-minus-circle-01", "plus-minus-circle-02", "plus-minus-square-01",
    "plus-minus-square-02", "plus-sign", "plus-sign-circle", "plus-sign-square", "png-01",
    "png-02", "podium", "pointing-left-01", "pointing-left-02", "pointing-left-03",
    "pointing-left-04", "pointing-left-05", "pointing-left-06", "pointing-left-07", 
    "pointing-right-01", "pointing-right-02", "pointing-right-03", "pointing-right-04", 
    "pointing-right-05", "pointing-right-06", "pointing-right-07", "police-badge", 
    "police-car", "police-station", "pool", "pool-table", "popover", "popsicle", 
    "pot-01", "pot-02", "potatoes", "potion", "pound", "pound-circle", "pound-receive", 
    "pound-send", "pound-square", "power-service", "power-socket-01", "power-socket-02", 
    "pray", "praying", "presentation-01", "presentation-02", "presentation-03", "presentation-04", 
    "presentation-05", "presentation-06", "presentation-07", "presentation-bar-chart-01", "presentation-bar-chart-02", 
    "presentation-line-chart-01", "presentation-line-chart-02", "presentation-online", "presentation-podium", "previous", "priest",
    "printer", "printer-off", "priority-high", "priority-low", "priority-medium", "prison", "prison-guard", "prism", "prism-01", 
    "private", "product-loading", "profile", "profile-02", "programming-flag", "projector", "projector-01", "property-add", 
    "property-delete", "property-edit", "property-new", "property-search", "property-view", "protect", "pulse-01", "pulse-02", 
    "pulse-rectangle-01", "pulse-rectangle-02", "pumpkin", "punch", "purchase-tag", "purse", "push-up-bar", "puzzle", "pyramid", 
    "pyramid-maslowo", "pyramid-structure-01", "pyramid-structure-02", "qq", "qr-code-01", "question", "queue-01", "queue-02", 
    "quill-write-01", "quill-write-02", "quiz-01", "quiz-02", "quiz-03", "quiz-04", "quiz-05", "quran-01", "quran-02", "quran-03", 
    "racing-flag", "radar-01", "radar-02", "radial", "radio", "radio-01", "radio-02", "radioactive-alert", "radius", "rain", 
    "rain-double-drop", "rain-drop", "rainbow", "ramadhan-01", "ramadhan-02", "ramadhan-month", "ranking", "raw-01", "raw-02", 
    "re-tweet", "react", "real-estate-01", "real-estate-02", "record", "rectangular", "rectangular-01", "recycle-01", "recycle-02", 
    "recycle-03", "reddit", "reflex", "refresh", "refrigerator", "registered", "relief", "reload", "reminder", "remote-control", 
    "remove-01", "remove-02", "remove-circle", "remove-circle-half-dot", "remove-pi", "remove-square", "renewable-energy", 
    "renewable-energy-01", "repair", "repeat", "repeat-01", "repeat-off-01", "repeat-one-01", "repeat-one-02", "replay", 
    "repository", "resize-01", "resize-02", "restore-bin", "return-request", "revenue", "reverse-withdrawal-01", 
    "reverse-withdrawal-02", "rhombus", "rhombus-01", "rice-bowl-01", "rice-bowl-02", "right-angle", "right-to-left-block-quote", 
    "right-to-left-list-bullet", "right-to-left-list-dash", "right-to-left-list-number", "right-to-left-list-triangle", 
    "right-triangle", "ripple", "riyal-circular", "riyal-square", "road", "road-01", "road-02", "road-location-01", 
    "road-location-02", "road-wayside", "robotic", "rocket", "rocket-01", "rocket-02", "rocking-chair", "roller-skate", 
    "rolling-pin", "root-01", "root-02", "root-circle", "rotate-01", "rotate-02", "rotate-360", "rotate-bottom-left", 
    "rotate-bottom-right", "rotate-clockwise", "rotate-crop", "rotate-left-01", "rotate-left-02", "rotate-left-03", "rotate-left-04", 
    "rotate-left-05", "rotate-left-06", "rotate-right-01", "rotate-right-02", "rotate-right-03", "rotate-right-04", "rotate-right-05", 
    "rotate-right-06", "rotate-square", "rotate-top-left", "rotate-top-right", "route-01", "route-02", "route-03", "route-block", 
    "router", "router-01", "router-02", "rowing", "rss", "rss-connected-01", "rss-connected-02", "rss-error", "rss-locked", 
    "rub-el-hizb", "ruby", "ruler", "running-shoes", "sad", "sad-dizzy", "safari", "safe", "safe-delivery-01", "safe-delivery-02", 
    "safety-pin-01", "safety-pin-02", "sailboat-coastal", "sailboat-offshore", "salah", "salah-time", "sale-tag-01", "sale-tag-02", 
"sandwich", "satellite", "satellite-01", "satellite-02", "satellite-03", "saturn", "saturn-01", "saturn-02", "sausage", 
"save-energy-01", "save-energy-02", "save-money-dollar", "savings", "scale", "scale-01", "scan", "scan-qr-code", "scared", 
"school", "school-01", "school-bell-01", "school-bell-02", "school-bus", "school-report-card", "school-tie", "scientific", 
"scissors", "scissors-01", "scissors-rectangle", "scooter-01", "scooter-02", "scooter-03", "scooter-04", "scooter-electric", "screen-add-to-home", 
"screen-lock-rotation", "screen-rotation", "scribd", "scroll", "scroll-horizontal", "scroll-vertical", "sd-card", "seal", 
"search-01", "search-02", "search-add", "search-area", "search-circle", "search-dollar", "search-focus", "search-list-01", "search-list-02", 
"search-minus", "search-remove", "search-replace", "search-square", "search-visual", "searching", "2nd-bracket", "2nd-bracket-circle", 
"2nd-bracket-square", "secure", "security", "security-block", "security-check", "security-key", "security-keyhole", "security-lock", 
"security-password", "security-validation", "security-wifi", "segment", "select-01", "select-02", "send-to-mobile", "sensory", "service-01", 
"service-02", "setting-01", "setting-02", "setting-03", "setting-04", "setting-05", "setting-06", "setting-07", "setting-done-01", 
"setting-done-02", "setting-done-03", "setting-done-04", "setting-error-03", "setting-error-04", "setup-01", "setup-02", "shaka-01", 
"shaka-02", "shaka-03", "shaka-04", "shampoo", "shapes", "share-01", "share-02", "share-03", "share-04", "share-05", "share-06", "share-07", 
"share-08", "share-knowledge", "share-location-01", "share-location-02", "shared-wifi", "sharing", "shark", "sharpener", "shaving-razor", "shell-snail", 
"sheriff-01", "sheriff-02", "shield-blockchain", "shield-energy", "shield-key", "shield-keyhole", "shield-plus", "shield-user", 
"shipment-tracking", "shirt-01", "shocked", "shop-sign", "shopping-bag-01", "shopping-bag-02", "shopping-bag-03", "shopping-bag-add",
"shopping-bag-check", "shopping-bag-favorite", "shopping-bag-remove", "shopping-basket-01", "shopping-basket-02", "shopping-basket-03",
"shopping-basket-add-01", "shopping-basket-add-02", "shopping-basket-add-03", "shopping-basket-check-in-01", "shopping-basket-check-in-02",
"shopping-basket-check-in-03", "shopping-basket-check-out-01", "shopping-basket-check-out-02", "shopping-basket-check-out-03",
"shopping-basket-done-01", "shopping-basket-done-02", "shopping-basket-done-03", "shopping-basket-favorite-01", "shopping-basket-favorite-02", 
"shopping-basket-favorite-03", "shopping-basket-remove-01", "shopping-basket-remove-02", "shopping-basket-remove-03",
"shopping-basket-secure-01", "shopping-basket-secure-02", "shopping-basket-secure-03", "shopping-cart-01", "shopping-cart-02",
"shopping-cart-add-01", "shopping-cart-add-02", "shopping-cart-check-in-01", "shopping-cart-check-in-02", "shopping-cart-check-out-01",
"shopping-cart-check-out-02", "shopping-cart-favorite-01", "shopping-cart-favorite-02", "shopping-cart-remove-01",
"shopping-cart-remove-02", "shorts-pants", "shuffle", "shuffle-square", "shutterstock", "sidebar-bottom", "sidebar-left",
"sidebar-left-01", "sidebar-right", "sidebar-right-01", "sidebar-top", "sign-language-c", "signal", "signal-full-01",
"signal-full-02", "signal-low-01", "signal-low-02", "signal-low-medium", "signal-medium-01", "signal-medium-02", "signal-no-01",
"signal-no-02", "signature", "silence", "simcard-01", "simcard-02", "simcard-dual", "sin", "sine-01", "sine-02",
"sing-left", "sing-right", "sink-01", "sink-02", "siri", "sketch", "skew", "skip-down", "skip-forward", "skip-left",
"skip-right", "skip-up", "skull", "skype", "slack", "sleeping", "sleeveless", "slide-star-01", "slide-star-02",
"slider-horizontal-01", "slider-horizontal-02", "slider-vertical-01", "slider-vertical-02", "slideshare",
"slow-winds", "smart", "smart-01", "smart-02", "smart-ac", "smart-phone-01", "smart-phone-02", "smart-phone-03",
"smart-phone-04", "smart-phone-landscape", "smart-watch-01", "smart-watch-02", "smart-watch-03", "smart-watch-04",
"smartphone-lost-wifi", "smartphone-wifi", "smile", "smile-dizzy", "snail", "snapchat", "snow", "soap-01",
"soap-02", "soccer-01", "soccer-02", "soccer-ball", "social-network-01", "social-network-02", "software",
"software-license", "software-uninstall", "soil-moisture-field", "soil-moisture-global", "soil-temperature-field",
"soil-temperature-global", "solar-energy", "solar-panel-01", "solar-panel-02", "solar-panel-03",
"solar-panel-04", "solar-panel-05", "solar-power", "solid-line-01", "solid-line-02", "sort-by-down-01",
"sort-by-down-02", "sort-by-up-01", "sort-by-up-02", "sorting-01", "sorting-02", "sorting-03", "sorting-az-01",
"sorting-az-02", "sorting-down", "sorting-up", "sorting-za-01", "soundcloud", "source-code", "source-code-circle", 
"source-code-square", "spaceship", "spades", "spaghetti", "spam", "sparkles", "spartan-helmet", "spatula", "speaker", 
"speaker-01", "speach-to-text", "speed-train-01", "speed-train-02", "sperm", "sphere", "spirals", "spoon-and-fork", 
"spoon-and-knife", "spotify", "spray", "spreadsheet-01", "spreadsheet-02", "spring", "sql", "square", "square-01", 
"square-arrow-diagonal-01", "square-arrow-diagonal-02", "square-arrow-down-01", "square-arrow-down-02", "square-arrow-down-03", 
"square-arrow-down-double", "square-arrow-down-left", "square-arrow-down-right", "square-arrow-expand-01", "square-arrow-expand-02", 
"square-arrow-horizontal", "square-arrow-left-01", "square-arrow-left-02", "square-arrow-left-03", "square-arrow-left-double", 
"square-arrow-left-right", "square-arrow-move-down-left", "square-arrow-move-down-right", "square-arrow-move-left-down", 
"square-arrow-move-left-up", "square-arrow-move-right-down", "square-arrow-move-right-up", "square-arrow-move-up-left", 
"square-arrow-move-up-right", "square-arrow-reload-01", "square-arrow-reload-02", "square-arrow-right-01", "square-arrow-right-02", 
"square-arrow-right-03", "square-arrow-right-double", "square-arrow-shrink-01", "square-arrow-shrink-02", "square-arrow-up-01", 
"square-arrow-up-02", "square-arrow-up-03", "square-arrow-up-double", "square-arrow-up-down", "square-arrow-up-left", "square-arrow-up-right", 
"square-arrow-vertical", "square-circle", "square-lock-01", "square-lock-02", "square-lock-add-01", "square-lock-add-02", "square-lock-check-01", 
"square-lock-check-02", "square-lock-minus-01", "square-lock-minus-02", "square-lock-password", "square-lock-remove-01", "square-lock-remove-02", 
"square-root-square", "square-unlock-01", "square-unlock-02", "stack-star", "stairs", "star", "star-circle", "star-face", "star-half", "star-off",
 "star-square", "start-up-01", "start-up-02", "sticky-note-01", "sticky-note-02", "stop", "stop-watch", "store-01", "store-02", "store-03", 
 "store-04", "store-location-01", "store-location-02", "store-remove-01", "store-remove-02", "store-verification-01", "store-verification-02", 
 "straight-edge", "strategy", "stroke-center", "stroke-inside", "stroke-outside", "structure-01", "structure-02", "structure-03", 
 "structure-04", "structure-05", "structure-add", "structure-check", "structure-fail", "structure-folder", "structure-folder-circle",
"student", "student-card", "sun-01", "sun-02", "sun-03", "sun-cloud-01", "sun-cloud-02", "sun-cloud-angled-rain-01", 
"sun-cloud-angled-rain-02", "sun-cloud-angled-rain-zap-01", "sun-cloud-angled-rain-zap-02", "sun-cloud-big-rain-01",
"sun-cloud-big-rain-02", "sun-cloud-fast-wind", "sun-cloud-hailstone-01", "sun-cloud-hailstone-02", "sun-cloud-little-rain-01",
"sun-cloud-little-rain-02", "sun-cloud-little-snow-01", "sun-cloud-little-snow-02", "sun-cloud-mid-rain-01", "sun-cloud-mid-rain-02",
"sun-cloud-mid-snow-01", "sun-cloud-mid-snow-02", "sun-cloud-slow-wind-01", "sun-cloud-slow-wind-02", "sun-cloud-snow-01",
"sun-cloud-snow-02", "sunglasses", "sunrise", "sunset", "super-mario", "super-mario-toad", "surface-01", "surface-02", 
"surface-03", "surfboard", "surprise", "sushi-01", "sushi-02", "sushi-03", "suspicious", "sustainable-energy", "svg-01",
"svg-02", "swarm", "swimming", "swimming-cap", "swipe-down-01", "swipe-down-02", "swipe-down-03", "swipe-down-04",
"swipe-down-05", "swipe-down-06", "swipe-down-07", "swipe-down-08", "swipe-left-01", "swipe-left-02", "swipe-left-03",
"swipe-left-04", "swipe-left-05", "swipe-left-06", "swipe-left-07", "swipe-left-08", "swipe-left-09", "swipe-right-01",
"swipe-right-02", "swipe-right-03", "swipe-right-04", "swipe-right-05", "swipe-right-06", "swipe-right-07",
"swipe-right-08", "swipe-right-09", "swipe-up-01", "swipe-up-02", "swipe-up-03", "swipe-up-04", "swipe-up-05",
"swipe-up-06", "swipe-up-07", "swipe-up-08", "sword-01", "sword-02", "sword-03", "system-update-01", "system-update-02",
"t-shirt", "table", "table-01", "table-02", "table-03", "table-lamp-01", "table-lamp-02", "table-round",
"table-tennis-bat", "tablet-01", "tablet-02", "tablet-connected-bluetooth", "tablet-connected-usb", 
"tablet-connected-wifi", "tablet-pen", "taco-01", "taco-02", "tag-01", "tag-02", "tags", "taj-mahal", "tan", "tank-top",
"tap-01", "tap-02", "tap-03", "tap-04", "tap-05", "tap-06", "tap-07", "tap-08", "target-01", "target-02", "target-03", 
"task-01", "task-02", "task-add-01", "task-add-02", "task-daily-01", "task-daily-02", "task-done-01", "task-done-02",
"task-edit-01", "task-edit-02", "task-remove-01", "task-remove-02", "taxes", "taxi", "tea", "tea-pod", "teacher", "teaching-desk", "team-viewer", 
"telegram", "telephone", "telescope-01", "telescope-02", "television-table", "temperature", "tennis-ball", "terrace", "test-tube", "test-tube-01", 
"test-tube-02", "test-tube-03", "tetris", "text", "text-align-center", "text-align-justify-center", "text-align-justify-left", 
"text-align-justify-right", "text-align-left", "text-align-left-01", "text-align-right", "text-align-right-01", "text-all-caps", "text-bold", 
"text-centerline-center-top", "text-centerline-left", "text-centerline-middle", "text-centerline-right", "text-check", "text-clear", "text-color", 
"text-creation", "text-first-line-left", "text-first-line-right", "text-font", "text-footnote", "text-indent-01", "text-indent-less", 
"text-indent-more", "text-italic", "text-kerning", "text-number-sign", "text-selection", "text-smallcaps", "text-strikethrough", "text-subscript", 
"text-superscript", "text-tracking", "text-underline", "text-variable-front", "text-vertical-alignment", "text-wrap", "thank-you-01", "thank-you-02", 
"the-prophets-mosque", "thermometer", "thermometer-cold", "thermometer-warm", "3rd-bracket", "3rd-bracket-circle", "3rd-bracket-square", "threads", 
"threads-ellipse", "threads-rectangle", "3-finger-01", "3-finger-02", "3-finger-03", "3-finger-04", "3-finger-05", "thumb-down", 
"thumb-down-ellipse", "thumb-down-rectangle", "thumbs-down", "thumbs-down-ellipse", "thumbs-down-rectangle", "thumbs-up", "thumbs-up-down", 
"thumbs-up-ellipse", "thumbs-up-rectangle", "tick-01", "tick-02", "tick-03", "tick-04", "tick-double-01", "tick-double-02", "tick-double-03", 
"tick-double-04", "ticket-01", "ticket-02", "ticket-03", "ticket-star", "tie", "tiktok", "time-01", "time-02", "time-03", "time-04", 
"time-half-pass", "time-management", "time-management-circle", "time-quarter", "time-quarter-pass", "time-schedule", "time-setting-01", 
"time-setting-02", "time-setting-03", "timer-01", "timer-02", "tips", "tired-01", "tired-02", "tissue-paper", "toggle-off", "toggle-on", "toilet-01", 
"toilet-02", "tongue", "tongue-01", "tongue-wink-left", "tongue-wink-right", "tools", "tornado-01", "tornado-02", "touch-01", "touch-02", "touch-03", 
"touch-04", "touch-05", "touch-06", "touch-07", "touch-08", "touch-09", "touch-10", "touch-interaction-01", "touch-interaction-02", 
"touch-interaction-03", "touch-interaction-04", "touch-locked-01", "touch-locked-02", "touch-locked-03", "touch-locked-04", "touchpad-01", 
"touchpad-02", "touchpad-03", "touchpad-04", "towels", "toy-train", "tractor", "trade-down", "trade-mark", "trade-up", "traffic-cone", 
"traffic-incident", "traffic-light", "train-01", "train-02", "tram", "translate", "translation", "transmission", "transparency", 
"trapezoid-line-horizontal", "trapezoid-line-vertical", "travel-bag", "treadmill-01", "treadmill-02", "treatment", "tree-01", "tree-02", "tree-03", 
"tree-04", "tree-05", "tree-06", "tree-07", "triangle", "triangle-01", "triangle-02", "triangle-03", "trolley-01", "trolley-02", "tropical-storm", 
"tropical-storm-tracks-01", "tropical-storm-tracks-02", "truck", "truck-delivery", "truck-monster", "truck-return", "trulli", "tsunami", "tumblr", 
"turtle-neck", "tv-01", "tv-02", "tv-fix", "tv-issue", "tv-smart", "twin-tower", "twitch", "twitter", "twitter-square", "two-finger-01", 
"two-finger-02", "two-finger-03", "two-finger-04", "two-finger-05", "txt-01", "txt-02", "type-cursor", "uber", "ufo", "ufo-01", "umbrella", 
"umbrella-dollar", "unamused", "unavailable", "underpants-01", "underpants-02", "underpants-03", "unfold-less", "unfold-more", "ungrouped-objects", 
"unicorn", "uniform", "union", "universal-serial-bus", "university", "unlink-01", "unlink-02", "unlink-03", "unlink-04", "unlink-05", "unlink-06", 
"unsplash", "upload-01", "upload-02", "upload-03", "upload-04", "upload-05", "upload-circle-01", "upload-circle-02", "upload-square-01", 
"upload-square-02", "upwork", "usb", "usb-bugs", "usb-connected-01", "usb-connected-02", "usb-connected-03", "usb-error", "usb-memory-01", 
"usb-memory-02", "usb-not-connected-01", "usb-not-connected-02", "user", "user-account", "user-add-01", "user-add-02", "user-arrow-left-right", 
"user-block-01", "user-block-02", "user-check-01", "user-check-02", "user-circle", "user-circle-02", "user-edit-01", "user-full-view", "user-group", 
"user-id-verification", "user-list", "user-lock-01", "user-lock-02", "user-love-01", "user-love-02", "user-minus-01", "user-minus-02", 
"user-multiple", "user-multiple-02", "user-question-01", "user-question-02", "user-remove-01", "user-remove-02", "user-roadside", "user-search-01", 
"user-search-02", "user-settings-01", "user-settings-02", "user-sharing", "user-shield-01", "user-shield-02", "user-square", "user-star-01", 
"user-star-02", "user-story", "user-switch", "user-unlock-01", "user-unlock-02", "uv-01", "uv-02", "uv-03", "v-sign", "vaccination", 
"vacuum-cleaner", "validation", "validation-approval", "van", "variable", "vegetarian-food", "vertical-resize", "vertical-scroll-point", "vest", 
"victory-hand-01", "victory-hand-02", "victory-hand-03", "video-01", "video-02", "video-console", "video-off", "video-replay", "view", "view-off", 
"view-off-slash", "vimeo", "vine", "vine-square", "vintage-clock", "virtual-reality-vr-01", "virtual-reality-vr-02", "virus", "visa", "voice-id", 
"volleyball", "volume-high", "volume-low", "volume-minus", "volume-mute-01", "volume-mute-02", "volume-off", "volume-up", "vomiting", "voucher", 
"vr", "vr-glasses", "vynil-01", "vynil-02", "vynil-03", "w3-c", "waiter", "waiters", "wall-lamp", "wallet-01", "wallet-02", "wallet-03", 
"wallet-add-01", "wallet-add-02", "wallet-done-01", "wallet-done-02", "wallet-not-found-01", "wallet-not-found-02", "wallet-remove-01", 
"wallet-remove-02", "wanted", "wardrobe-01", "wardrobe-02", "wardrobe-03", "wardrobe-04", "washington-monument", "waste", "waste-restore", 
"watch-01", "watch-02", "water-energy", "water-polo", "water-pump", "watermelon", "wattpad", "wattpad-square", "wave", "waving-hand-01", 
"waving-hand-02", "waze", "web-design-01", "web-design-02", "web-programming", "web-protection", "web-security", "web-validation", "webflow", 
"webflow-ellipse", "webflow-rectangle", "website-01", "website-02", "wechat", "weight-scale", "weight-scale-01", "whatsapp", "whatsapp-business", 
"wheelchair", "whistle", "wifi-01", "wifi-02", "wifi-circle", "wifi-connected-01", "wifi-connected-02", "wifi-connected-03", "wifi-disconnected-01", 
"wifi-disconnected-02", "wifi-disconnected-03", "wifi-disconnected-04", "wifi-error-01", "wifi-error-02", "wifi-full-signal", "wifi-location", 
"wifi-lock", "wifi-low-signal", "wifi-no-signal", "wifi-off-01", "wifi-off-02", "wifi-problem-01", "wifi-problem-02", "wifi-protected", 
"wifi-square", "wifi-unlock", "wikipedia", "wind-power", "wind-power-01", "wind-power-02", "wind-power-03", "wind-turbine", "windy", "wink", 
"winking", "wireless", "wireless-cloud-access", "wise", "wordpress", "work-alert", "work-history", "work-update", "workflow-circle-01", 
"workflow-circle-02", "workflow-circle-03", "workflow-circle-04", "workflow-circle-05", "workflow-circle-06", "workflow-square-01", 
"workflow-square-02", "workflow-square-03", "workflow-square-04", "workflow-square-05", "workflow-square-06", "workflow-square-07", 
"workflow-square-08", "workflow-square-09", "workflow-square-10", "workout-battle-ropes", "workout-gymnastics", "workout-kicking", "workout-run", 
"workout-sport", "workout-squats", "workout-stretching", "world-01", "world-02", "world-03", "worried", "worship", "wrong-passcode-01", 
"wrong-passcode-02", "x-ray", "x-variable", "x-variable-circle", "x-variable-square", "xing", "xls-01", "xls-02", "xml-01", "xml-02", "xsl-01", 
"xsl-02", "yelp", "yen", "yen-circle", "yen-receive", "yen-send", "yen-square", "yoga-01", "yoga-02", "yoga-03", "yoga-ball", "yoga-mat", 
"young-coconut", "youtube", "yurt", "zakat", "zakat-bag-closed", "zakat-bag-open", "zap", "zip-01", "zip-02", "zoom", "zoom-circle", "zoom-in-area", 
"zoom-out-area", "zoom-square",
];


// Bootstrap icons (your existing list)
const bootstrapIcons = [
    "info", "info-circle", "info-circle-fill", "info-lg", "info-square", "info-square-fill", "question", "question-circle", "question-circle-fill", 
"question-lg", "question-square", "question-square-fill", "exclamation", "exclamation-circle", "exclamation-circle-fill", "exclamation-lg", 
"exclamation-triangle", "exclamation-triangle-fill", "check", "check-circle", "check-circle-fill", "check-lg", "check-square", "check-square-fill", 
"x", "x-circle", "x-circle-fill", "x-lg", "x-square", "x-square-fill", "calendar", "calendar-fill", "calendar-date", "calendar-event", "clock", 
"clock-fill", "clock-history", "bell", "bell-fill", "bell-slash", "bookmark", "bookmark-fill", "bookmark-check", "tag", "tag-fill", "tags", "flag", 
"flag-fill", "geo-alt", "geo-alt-fill", "pin", "pin-fill", "pin-map", "search", "lightbulb", "lightbulb-fill", "filter", "sliders", "gear", 
"gear-fill", "tools", "wrench", "shield", "shield-fill", "lock", "unlock", "key", "key-fill", "activity", "bandaid", "bandaid-fill", "capsule", 
"capsule-pill", "clipboard-pulse", "file-earmark-medical", "file-earmark-medical-fill", "file-medical", "file-medical-fill", "heart", "heart-fill", 
"heart-pulse", "heart-pulse-fill", "hospital", "hospital-fill", "journal-medical", "lungs", "lungs-fill", "prescription", "prescription2", "virus", 
"virus2", "eyedropper", "droplet", "droplet-fill", "droplet-half", "thermometer", "thermometer-half", "thermometer-high", "thermometer-low", 
"person-wheelchair", "ear", "ear-fill", "eyeglasses", "universal-access", "universal-access-circle", "people", "people-fill", "person", "person-fill", 
"person-badge", "person-badge-fill", "person-bounding-box", "person-circle", "person-rolodex", "person-vcard", "person-vcard-fill", 
"person-workspace", "building", "building-fill", "bank", "bank2", "briefcase", "briefcase-fill", "shop", "shop-window", "diagram-2", "diagram-2-fill", 
"diagram-3", "diagram-3-fill", "award", "award-fill", "trophy", "trophy-fill", "bullseye", "mortarboard", "mortarboard-fill", "globe", "globe2", 
"buildings", "buildings-fill", "alarm-fill", "align-bottom", "align-center", "align-end", "align-middle", "align-start", "align-top", "alt", "app", 
"app-indicator", "archive", "archive-fill", "arrow-90deg-down", "arrow-90deg-left", "arrow-90deg-right", "arrow-90deg-up", "arrow-bar-down", 
"arrow-bar-left", "arrow-bar-right", "arrow-bar-up", "arrow-clockwise", "arrow-counterclockwise", "arrow-down", "arrow-down-circle", 
"arrow-down-circle-fill", "arrow-down-left", "arrow-down-left-circle", "arrow-down-left-circle-fill", "arrow-down-left-square", 
"arrow-down-left-square-fill", "arrow-down-right", "arrow-down-right-circle", "arrow-down-right-circle-fill", "arrow-down-right-square", 
"arrow-down-right-square-fill", "arrow-down-square", "arrow-down-square-fill", "arrow-left", "arrow-left-circle", "arrow-left-circle-fill", 
"arrow-left-square", "arrow-left-square-fill", "arrow-repeat", "arrow-return-left", "arrow-return-right", "arrow-right", "arrow-right-circle", 
"arrow-right-circle-fill", "arrow-right-square", "arrow-right-square-fill", "arrow-up", "arrow-up-circle", "arrow-up-circle-fill", "arrow-up-left", 
"arrow-up-left-circle", "arrow-up-left-circle-fill", "arrow-up-left-square", "arrow-up-left-square-fill", "arrow-up-right", "arrow-up-right-circle", 
"arrow-up-right-circle-fill", "arrow-up-right-square", "arrow-up-right-square-fill", "arrow-up-square", "arrow-up-square-fill", 
"arrows-angle-contract", "arrows-angle-expand", "arrows-collapse", "arrows-expand", "arrows-fullscreen", "arrows-move", "aspect-ratio", 
"aspect-ratio-fill", "asterisk", "at", "award", "award-fill", "back", "backspace", "backspace-fill", "backspace-reverse", "backspace-reverse-fill", 
"badge-3d", "badge-3d-fill", "badge-4k", "badge-4k-fill", "badge-8k", "badge-8k-fill", "badge-ad", "badge-ad-fill", "badge-ar", "badge-ar-fill", 
"badge-cc", "badge-cc-fill", "badge-hd", "badge-hd-fill", "badge-sd", "badge-sd-fill", "badge-tm", "badge-tm-fill", "badge-vo", "badge-vo-fill", 
"badge-vr", "badge-vr-fill", "badge-wc", "badge-wc-fill", "bag", "bag-check", "bag-check-fill", "bag-dash", "bag-dash-fill", "bag-fill", "bag-plus", 
"bag-plus-fill", "bag-x", "bag-x-fill", "calculator", "calculator-fill", "calendar", "calendar-check", "calendar-check-fill", "calendar-date",
"calendar-date-fill", "calendar-day", "calendar-day-fill", "calendar-event", "calendar-event-fill", "calendar-fill", "calendar-minus", 
"calendar-minus-fill", "calendar-month", "calendar-month-fill", "calendar-plus", "calendar-plus-fill", "calendar-range", "calendar-range-fill", 
"calendar-week", "calendar-week-fill", "calendar-x", "calendar-x-fill", "camera", "camera2", "camera-fill", "camera-reels", "camera-reels-fill", 
"camera-video", "camera-video-fill", "camera-video-off", "camera-video-off-fill", "capslock", "capslock-fill", "card-checklist", "card-heading", 
"card-image", "card-list", "card-text", "caret-down", "caret-down-fill", "caret-down-square", "caret-down-square-fill", "caret-left", 
"caret-left-fill", "caret-left-square", "caret-left-square-fill", "caret-right", "caret-right-fill", "caret-right-square", "caret-right-square-fill", 
"caret-up", "caret-up-fill", "caret-up-square", "caret-up-square-fill", "cart", "cart2", "cart3", "cart4", "cart-check", "cart-check-fill", 
"cart-dash", "cart-dash-fill", "cart-fill", "cart-plus", "cart-plus-fill", "cart-x", "cart-x-fill", "cash", "cash-stack", "cast", "chat", "chat-dots", 
"chat-dots-fill", "chat-fill", "chat-left", "chat-left-dots", "chat-left-dots-fill", "chat-left-fill", "chat-left-quote", "chat-left-quote-fill", 
"chat-left-text", "chat-left-text-fill", "chat-quote", "chat-quote-fill", "chat-right", "chat-right-dots", "chat-right-dots-fill", "chat-right-fill", 
"chat-right-quote", "chat-right-quote-fill", "chat-right-text", "chat-right-text-fill", "chat-square", "chat-square-dots", "chat-square-dots-fill", 
"chat-square-fill", "chat-square-quote", "chat-square-quote-fill", "chat-square-text", "chat-square-text-fill", "chat-text", "chat-text-fill", 
"check", "check2", "check2-all", "check2-circle", "check2-square", "check-all", "check-circle", "check-circle-fill", "check-lg", "check-square", 
"check-square-fill", "chevron-bar-contract", "chevron-bar-down", "chevron-bar-expand", "chevron-bar-left", "chevron-bar-right", "chevron-bar-up", 
"chevron-compact-down", "chevron-compact-left", "chevron-compact-right", "chevron-compact-up", "chevron-contract", "chevron-double-down", 
"chevron-double-left", "chevron-double-right", "chevron-double-up", "chevron-down", "chevron-expand", "chevron-left", "chevron-right", "chevron-up", 
"circle", "circle-fill", "circle-half", "clipboard", "clipboard-check", "clipboard-data", "clipboard-minus", "clipboard-plus", "clipboard-x", "clock", 
"clock-fill", "clock-history", "cloud", "cloud-arrow-down", "cloud-arrow-down-fill", "cloud-arrow-up", "cloud-arrow-up-fill", "cloud-check", 
"cloud-check-fill", "cloud-download", "cloud-download-fill", "cloud-drizzle", "cloud-drizzle-fill", "cloud-fill", "cloud-fog", "cloud-fog-fill", 
"cloud-fog2", "cloud-fog2-fill", "cloud-hail", "cloud-hail-fill", "cloud-haze", "cloud-haze-fill", "cloud-haze2", "cloud-haze2-fill", 
"cloud-lightning", "cloud-lightning-fill", "cloud-lightning-rain", "cloud-lightning-rain-fill", "cloud-minus", "cloud-minus-fill", "cloud-moon", 
"cloud-moon-fill", "cloud-plus", "cloud-plus-fill", "cloud-rain", "cloud-rain-fill", "cloud-rain-heavy", "cloud-rain-heavy-fill", "cloud-slash", 
"cloud-slash-fill", "cloud-sleet", "cloud-sleet-fill", "cloud-snow", "cloud-snow-fill", "cloud-sun", "cloud-sun-fill", "cloud-upload", 
"cloud-upload-fill", "clouds", "clouds-fill", "cloudy", "cloudy-fill", "code", "code-slash", "code-square", "collection", "collection-fill", 
"collection-play", "collection-play-fill", "columns", "columns-gap", "command", "compass", "compass-fill", "cone", "cone-striped", "controller", 
"cpu", "cpu-fill", "credit-card", "credit-card-2-back", "credit-card-2-back-fill", "credit-card-2-front", "credit-card-2-front-fill", 
"credit-card-fill", "crop", "cup", "cup-fill", "cup-hot", "cup-hot-fill", "cup-straw", "cursor", "cursor-fill", "cursor-text", "dash", "dash-circle", 
"dash-circle-fill", "dash-lg", "dash-square", "dash-square-fill", "device-hdd", "device-hdd-fill", "device-ssd", "device-ssd-fill", "diagram-2", 
"diagram-2-fill", "diagram-3", "diagram-3-fill", "diamond", "diamond-fill", "diamond-half", "dice-1", "dice-1-fill", "dice-2", "dice-2-fill", 
"dice-3", "dice-3-fill", "dice-4", "dice-4-fill", "dice-5", "dice-5-fill", "dice-6", "dice-6-fill", "disc", "disc-fill", "discord", "display", 
"display-fill", "displayport", "displayport-fill", "distribute-horizontal", "distribute-vertical", "door-closed", "door-closed-fill", "door-open", 
"door-open-fill", "dot", "download", "dpad", "dpad-fill", "dribbble", "droplet", "droplet-fill", "droplet-half", "ear", "ear-fill", "earbuds", 
"easel", "easel-fill", "easel2", "easel2-fill", "easel3", "easel3-fill", "egg", "egg-fill", "egg-fried", "eject", "eject-fill", "emoji-angry", 
"emoji-angry-fill", "emoji-dizzy", "emoji-dizzy-fill", "emoji-expressionless", "emoji-expressionless-fill", "emoji-frown", "emoji-frown-fill", 
"emoji-heart-eyes", "emoji-heart-eyes-fill", "emoji-laughing", "emoji-laughing-fill", "emoji-neutral", "emoji-neutral-fill", "emoji-smile", 
"emoji-smile-fill", "emoji-smile-upside-down", "emoji-smile-upside-down-fill", "emoji-sunglasses", "emoji-sunglasses-fill", "emoji-wink", 
"emoji-wink-fill", "envelope", "envelope-check", "envelope-check-fill", "envelope-dash", "envelope-dash-fill", "envelope-exclamation", 
"envelope-exclamation-fill", "envelope-fill", "envelope-heart", "envelope-heart-fill", "envelope-open", "envelope-open-fill", "envelope-plus", 
"envelope-plus-fill", "envelope-slash", "envelope-slash-fill", "envelope-x", "envelope-x-fill", "eraser", "eraser-fill", "exclamation", 
"exclamation-circle", "exclamation-circle-fill", "exclamation-diamond", "exclamation-diamond-fill", "exclamation-lg", "exclamation-octagon", 
"exclamation-octagon-fill", "exclamation-square", "exclamation-square-fill", "exclamation-triangle", "exclamation-triangle-fill", "exclude", "eye", 
"eye-fill", "eye-slash", "eye-slash-fill", "eyedropper", "eyeglasses", "facebook", "file", "file-arrow-down", "file-arrow-down-fill", "file-arrow-up", 
"file-arrow-up-fill", "file-bar-graph", "file-bar-graph-fill", "file-binary", "file-binary-fill", "file-break", "file-break-fill", "file-check", 
"file-check-fill", "file-code", "file-code-fill", "file-diff", "file-diff-fill", "file-earmark", "file-earmark-arrow-down", 
"file-earmark-arrow-down-fill", "file-earmark-arrow-up", "file-earmark-arrow-up-fill", "file-earmark-bar-graph", "file-earmark-bar-graph-fill", 
"file-earmark-binary", "file-earmark-binary-fill", "file-earmark-break", "file-earmark-break-fill", "file-earmark-check", "file-earmark-check-fill", 
"file-earmark-code", "file-earmark-code-fill", "file-earmark-diff", "file-earmark-diff-fill", "file-earmark-easel", "file-earmark-easel-fill", 
"file-earmark-excel", "file-earmark-excel-fill", "file-earmark-fill", "file-earmark-font", "file-earmark-font-fill", "file-earmark-image", 
"file-earmark-image-fill", "file-earmark-lock", "file-earmark-lock-fill", "file-earmark-lock2", "file-earmark-lock2-fill", "file-earmark-medical", 
"file-earmark-medical-fill", "file-earmark-minus", "file-earmark-minus-fill", "file-earmark-music", "file-earmark-music-fill", "file-earmark-pdf", 
"file-earmark-pdf-fill", "file-earmark-person", "file-earmark-person-fill", "file-earmark-play", "file-earmark-play-fill", "file-earmark-plus", 
"file-earmark-plus-fill", "file-earmark-post", "file-earmark-post-fill", "file-earmark-ppt", "file-earmark-ppt-fill", "file-earmark-richtext", 
"file-earmark-richtext-fill", "file-earmark-ruled", "file-earmark-ruled-fill", "file-earmark-slides", "file-earmark-slides-fill", 
"file-earmark-spreadsheet", "file-earmark-spreadsheet-fill", "file-earmark-text", "file-earmark-text-fill", "file-earmark-word", 
"file-earmark-word-fill", "file-earmark-x", "file-earmark-x-fill", "file-earmark-zip", "file-earmark-zip-fill", "file-easel", "file-easel-fill", 
"file-excel", "file-excel-fill", "file-fill", "file-font", "file-font-fill", "file-image", "file-image-fill", "file-lock", "file-lock-fill", 
"file-lock2", "file-lock2-fill", "file-medical", "file-medical-fill", "file-minus", "file-minus-fill", "file-music", "file-music-fill", "file-pdf", 
"file-pdf-fill", "file-person", "file-person-fill", "file-play", "file-play-fill", "file-plus", "file-plus-fill", "file-post", "file-post-fill", 
"file-ppt", "file-ppt-fill", "file-richtext", "file-richtext-fill", "file-ruled", "file-ruled-fill", "file-slides", "file-slides-fill", 
"file-spreadsheet", "file-spreadsheet-fill", "file-text", "file-text-fill", "file-word", "file-word-fill", "file-x", "file-x-fill", "file-zip", 
"file-zip-fill", "files", "files-alt", "filetype-aac", "filetype-ai", "filetype-bmp", "filetype-cs", "filetype-css", "filetype-csv", "filetype-doc", 
"filetype-docx", "filetype-exe", "filetype-gif", "filetype-heic", "filetype-html", "filetype-java", "filetype-jpg", "filetype-js", "filetype-json", 
"filetype-jsx", "filetype-key", "filetype-m4p", "filetype-md", "filetype-mdx", "filetype-mov", "filetype-mp3", "filetype-mp4", "filetype-otf", 
"filetype-pdf", "filetype-php", "filetype-png", "filetype-ppt", "filetype-pptx", "filetype-psd", "filetype-py", "filetype-raw", "filetype-rb", 
"filetype-sass", "filetype-scss", "filetype-sh", "filetype-sql", "filetype-svg", "filetype-tiff", "filetype-tsx", "filetype-ttf", "filetype-txt", 
"filetype-wav", "filetype-woff", "filetype-xls", "filetype-xlsx", "filetype-xml", "filetype-yml", "film", "filter", "filter-circle", 
"filter-circle-fill", "filter-left", "filter-right", "filter-square", "filter-square-fill", "flag", "flag-fill", "flower1", "flower2", "flower3", 
"folder", "folder-check", "folder-fill", "folder-minus", "folder-plus", "folder-symlink", "folder-symlink-fill", "folder-x", "folder2", 
"folder2-open", "fonts", "forward", "forward-fill", "front", "fullscreen", "fullscreen-exit", "funnel", "funnel-fill", "gear", "gear-fill", 
"gear-wide", "gear-wide-connected", "gem", "gender-ambiguous", "gender-female", "gender-male", "gender-trans", "geo", "geo-alt", "geo-alt-fill", 
"geo-fill", "gift", "gift-fill", "github", "globe", "globe-americas", "globe-asia-australia", "globe-central-south-asia", "globe-europe-africa", 
"globe2", "google", "gpu-card", "graph-down", "graph-down-arrow", "graph-up", "graph-up-arrow", "grid", "grid-1x2", "grid-1x2-fill", "grid-3x2", 
"grid-3x2-gap", "grid-3x2-gap-fill", "grid-3x3", "grid-3x3-gap", "grid-3x3-gap-fill", "grid-fill", "grip-horizontal", "grip-vertical", "hammer", 
"hand-index", "hand-index-fill", "hand-index-thumb", "hand-index-thumb-fill", "hand-thumbs-down", "hand-thumbs-down-fill", "hand-thumbs-up", 
"hand-thumbs-up-fill", "handbag", "handbag-fill", "hash", "hdd", "hdd-fill", "hdd-network", "hdd-network-fill", "hdd-rack", "hdd-rack-fill", 
"hdd-stack", "hdd-stack-fill", "hdmi", "hdmi-fill", "headphones", "headset", "headset-vr", "heart", "heart-fill", "heart-half", "heptagon", 
"heptagon-fill", "heptagon-half", "hexagon", "hexagon-fill", "hexagon-half", "hospital", "hospital-fill", "hourglass", "hourglass-bottom", 
"hourglass-split", "hourglass-top", "house", "house-door", "house-door-fill", "house-fill", "hr", "hurricane", "hypnotize", "image", "image-alt", 
"image-fill", "images", "inbox", "inbox-fill", "inboxes-fill", "info", "info-circle", "info-circle-fill", "info-lg", "info-square", 
"info-square-fill", "input-cursor", "input-cursor-text", "instagram", "intersect", "journal", "journal-album", "journal-arrow-down", 
"journal-arrow-up", "journal-bookmark", "journal-bookmark-fill", "journal-check", "journal-code", "journal-medical", "journal-minus", "journal-plus", 
"journal-richtext", "journal-text", "journal-x", "journals", "joystick", "justify", "justify-left", "justify-right", "kanban", "kanban-fill", "key", 
"key-fill", "keyboard", "keyboard-fill", "ladder", "lamp", "lamp-fill", "laptop", "laptop-fill", "layer-backward", "layer-forward", "layers", 
"layers-fill", "layers-half", "layout-sidebar", "layout-sidebar-inset", "layout-sidebar-inset-reverse", "layout-sidebar-reverse", "layout-split", 
"layout-text-sidebar", "layout-text-sidebar-reverse", "layout-text-window", "layout-text-window-reverse", "layout-three-columns", "layout-wtf", 
"life-preserver", "lightbulb", "lightbulb-fill", "lightbulb-off", "lightbulb-off-fill", "lightning", "lightning-charge", "lightning-charge-fill", 
"lightning-fill", "link", "link-45deg", "linkedin", "list", "list-check", "list-columns", "list-columns-reverse", "list-nested", "list-ol", 
"list-stars", "list-task", "list-ul", "lock", "lock-fill", "magic", "magnet", "magnet-fill", "mailbox", "mailbox2", "map", "map-fill", "markdown", 
"markdown-fill", "mask", "mastodon", "medium", "megaphone", "megaphone-fill", "memory", "menu-app", "menu-app-fill", "menu-button", 
"menu-button-fill", "menu-button-wide", "menu-button-wide-fill", "menu-down", "menu-up", "messenger", "meta", "mic", "mic-fill", "mic-mute", 
"mic-mute-fill", "microsoft", "microsoft-teams", "minecart", "minecart-loaded", "modem", "modem-fill", "moisture", "moon", "moon-fill", "moon-stars", 
"moon-stars-fill", "mortarboard", "mortarboard-fill", "motherboard", "motherboard-fill", "mouse", "mouse-fill", "mouse2", "mouse2-fill", "mouse3", 
"mouse3-fill", "music-note", "music-note-beamed", "music-note-list", "music-player", "music-player-fill", "newspaper", "nintendo-switch", 
"node-minus", "node-minus-fill", "node-plus", "node-plus-fill", "nut", "nut-fill", "octagon", "octagon-fill", "octagon-half", "option", "outlet", 
"paint-bucket", "palette", "palette-fill", "palette2", "paperclip", "paragraph", "passport", "passport-fill", "patch-check", "patch-check-fill", 
"patch-exclamation", "patch-exclamation-fill", "patch-minus", "patch-minus-fill", "patch-plus", "patch-plus-fill", "patch-question", 
"patch-question-fill", "pause", "pause-btn", "pause-btn-fill", "pause-circle", "pause-circle-fill", "pause-fill", "paypal", "pc", "pc-display", 
"pc-display-horizontal", "pc-horizontal", "pci-card", "peace", "peace-fill", "pen", "pen-fill", "pencil", "pencil-fill", "pencil-square", "pentagon", 
"pentagon-fill", "pentagon-half", "people", "people-fill", "percent", "person", "person-add", "person-badge", "person-badge-fill", 
"person-bounding-box", "person-check", "person-check-fill", "person-circle", "person-dash", "person-dash-fill", "person-fill", "person-fill-add", 
"person-fill-check", "person-fill-dash", "person-fill-down", "person-fill-exclamation", "person-fill-gear", "person-fill-lock", "person-fill-slash", 
"person-fill-up", "person-fill-x", "person-gear", "person-heart", "person-hearts", "person-lock", "person-lines-fill", "person-plus", 
"person-plus-fill", "person-rolodex", "person-slash", "person-square", "person-up", "person-vcard", "person-vcard-fill", "person-video", 
"person-video2", "person-video3", "person-workspace", "person-x", "person-x-fill", "phone", "phone-fill", "phone-flip", "phone-landscape", 
"phone-landscape-fill", "phone-vibrate", "phone-vibrate-fill", "pie-chart", "pie-chart-fill", "piggy-bank", "piggy-bank-fill", "pin", "pin-angle", 
"pin-angle-fill", "pin-fill", "pin-map", "pin-map-fill", "pinterest", "pip", "pip-fill", "play", "play-btn", "play-btn-fill", "play-circle", 
"play-circle-fill", "play-fill", "playstation", "plug", "plug-fill", "plugin", "plus", "plus-circle", "plus-circle-dotted", "plus-circle-fill", 
"plus-lg", "plus-slash-minus", "plus-square", "plus-square-dotted", "plus-square-fill", "postage", "postage-fill", "postage-heart", 
"postage-heart-fill", "postcard", "postcard-fill", "postcard-heart", "postcard-heart-fill", "power", "prescription", "prescription2", "printer", 
"printer-fill", "projector", "projector-fill", "puzzle", "puzzle-fill", "qr-code", "qr-code-scan", "question", "question-circle", 
"question-circle-fill", "question-diamond", "question-diamond-fill", "question-lg", "question-octagon", "question-octagon-fill", "question-square", 
"question-square-fill", "quora", "quote", "radioactive", "rainbow", "receipt", "receipt-cutoff", "reception-0", "reception-1", "reception-2", 
"reception-3", "reception-4", "record", "record-btn", "record-btn-fill", "record-circle", "record-circle-fill", "record-fill", "record2", 
"record2-fill", "recycle", "reddit", "repeat", "repeat-1", "reply", "reply-all", "reply-all-fill", "reply-fill", "rewind", "rewind-btn", 
"rewind-btn-fill", "rewind-circle", "rewind-circle-fill", "rewind-fill", "robot", "rocket", "rocket-fill", "rocket-takeoff", "rocket-takeoff-fill", 
"router", "router-fill", "rss", "rss-fill", "rulers", "safe", "safe-fill", "safe2", "safe2-fill", "save", "save-fill", "save2", "save2-fill", 
"scissors", "screwdriver", "sd-card", "sd-card-fill", "search", "search-heart", "search-heart-fill", "segmented-nav", "send", "send-check", 
"send-check-fill", "send-dash", "send-dash-fill", "send-exclamation", "send-exclamation-fill", "send-fill", "send-plus", "send-plus-fill", 
"send-slash", "send-slash-fill", "send-x", "send-x-fill", "server", "share", "share-fill", "shield", "shield-check", "shield-exclamation", 
"shield-fill", "shield-fill-check", "shield-fill-exclamation", "shield-fill-minus", "shield-fill-plus", "shield-fill-x", "shield-lock", 
"shield-lock-fill", "shield-minus", "shield-plus", "shield-shaded", "shield-slash", "shield-slash-fill", "shield-x", "shift", "shift-fill", "shop", 
"shop-window", "shuffle", "signal", "signpost", "signpost-2", "signpost-2-fill", "signpost-fill", "signpost-split", "signpost-split-fill", "sim", 
"sim-fill", "skip-backward", "skip-backward-btn", "skip-backward-btn-fill", "skip-backward-circle", "skip-backward-circle-fill", "skip-backward-fill", 
"skip-end", "skip-end-btn", "skip-end-btn-fill", "skip-end-circle", "skip-end-circle-fill", "skip-end-fill", "skip-forward", "skip-forward-btn", 
"skip-forward-btn-fill", "skip-forward-circle", "skip-forward-circle-fill", "skip-forward-fill", "skip-start", "skip-start-btn", 
"skip-start-btn-fill", "skip-start-circle", "skip-start-circle-fill", "skip-start-fill", "skype", "slack", "slash", "slash-circle", "slash-lg", 
"slash-square", "sliders", "sliders2", "sliders2-vertical", "smartwatch", "snapchat", "snow", "snow2", "snow3", "sort-alpha-down", 
"sort-alpha-down-alt", "sort-alpha-up", "sort-alpha-up-alt", "sort-down", "sort-down-alt", "sort-numeric-down", "sort-numeric-down-alt", 
"sort-numeric-up", "sort-numeric-up-alt", "sort-up", "sort-up-alt", "soundwave", "speaker", "speaker-fill", "speedometer", "speedometer2", 
"spellcheck", "spotify", "square", "square-fill", "square-half", "stack", "stack-overflow", "star", "star-fill", "star-half", "stars", "steam", 
"stickies", "stickies-fill", "sticky", "sticky-fill", "stop", "stop-btn", "stop-btn-fill", "stop-circle", "stop-circle-fill", "stop-fill", 
"stoplights", "stoplights-fill", "stopwatch", "stopwatch-fill", "stripe", "subscript", "subtract", "suit-club", "suit-club-fill", "suit-diamond", 
"suit-diamond-fill", "suit-heart", "suit-heart-fill", "suit-spade", "suit-spade-fill", "sun", "sun-fill", "sunglasses", "sunrise", "sunrise-fill", 
"sunset", "sunset-fill", "superscript", "symmetry-horizontal", "symmetry-vertical", "table", "tablet", "tablet-fill", "tablet-landscape", 
"tablet-landscape-fill", "tag", "tag-fill", "tags", "tags-fill", "telegram", "telephone", "telephone-fill", "telephone-forward", 
"telephone-forward-fill", "telephone-inbound", "telephone-inbound-fill", "telephone-minus", "telephone-minus-fill", "telephone-outbound", 
"telephone-outbound-fill", "telephone-plus", "telephone-plus-fill", "telephone-x", "telephone-x-fill", "terminal", "terminal-dash", "terminal-fill", 
"terminal-plus", "terminal-split", "terminal-x", "text-center", "text-indent-left", "text-indent-right", "text-left", "text-paragraph", "text-right", 
"textarea", "textarea-resize", "textarea-t", "thermometer", "thermometer-half", "thermometer-high", "thermometer-low", "thermometer-snow", 
"thermometer-sun", "three-dots", "three-dots-vertical", "thunderbolt", "thunderbolt-fill", "ticket", "ticket-detailed", "ticket-detailed-fill", 
"ticket-fill", "ticket-perforated", "ticket-perforated-fill", "tiktok", "toggle-off", "toggle-on", "toggle2-off", "toggle2-on", "toggles", "toggles2", 
"tools", "tornado", "train-freight-front", "train-freight-front-fill", "train-front", "train-front-fill", "train-lightrail-front", 
"train-lightrail-front-fill", "translate", "trash", "trash-fill", "trash2", "trash2-fill", "trash3", "trash3-fill", "tree", "tree-fill", "triangle", 
"triangle-fill", "triangle-half", "trophy", "trophy-fill", "tropical-storm", "truck", "truck-flatbed", "truck-front", "truck-front-fill", "tsunami", 
"tv", "tv-fill", "twitch", "twitter", "twitter-x", "type", "type-bold", "type-h1", "type-h2", "type-h3", "type-h4", "type-h5", "type-h6", 
"type-italic", "type-strikethrough", "type-underline", "ubuntu", "ui-checks", "ui-checks-grid", "ui-radios", "ui-radios-grid", "umbrella", 
"umbrella-fill", "unindent", "union", "unity", "universal-access", "universal-access-circle", "unlock", "unlock-fill", "upc", "upc-scan", "upload", 
"usb", "usb-c", "usb-c-fill", "usb-drive", "usb-drive-fill", "usb-fill", "usb-micro", "usb-micro-fill", "usb-mini", "usb-mini-fill", "usb-plug", 
"usb-plug-fill", "usb-symbol", "valentine", "valentine2", "vector-pen", "view-list", "view-stacked", "vimeo", "vinyl", "vinyl-fill", "voicemail", 
"volume-down", "volume-down-fill", "volume-mute", "volume-mute-fill", "volume-off", "volume-off-fill", "volume-up", "volume-up-fill", "vr", "wallet", 
"wallet-fill", "wallet2", "watch", "water", "webcam", "webcam-fill", "wechat", "whatsapp", "wifi", "wifi-1", "wifi-2", "wifi-off", "wikipedia", 
"wind", "window", "window-dash", "window-desktop", "window-dock", "window-fullscreen", "window-plus", "window-sidebar", "window-split", 
"window-stack", "window-x", "windows", "wordpress", "wrench", "wrench-adjustable", "wrench-adjustable-circle", "wrench-adjustable-circle-fill", "x", 
"x-circle", "x-circle-fill", "x-diamond", "x-diamond-fill", "x-lg", "x-octagon", "x-octagon-fill", "x-square", "x-square-fill", "xbox", "yin-yang", 
"youtube", "zoom-in", "zoom-out",
];

// Health icons (your existing list)  
const healthIcons = [
   "filled-!", "outline-!", "filled-2", "outline-2", "filled-0", "outline-0", 
"filled-1", "outline-1", "filled-2", "outline-2", "filled-2g", "outline-2g", 
"filled-3", "outline-3", "filled-3g", "outline-3g", "filled-4", "outline-4", 
"filled-4x4", "outline-4x4", "filled-5", "outline-5", "filled-6", "outline-6", 
"filled-7", "outline-7", "filled-8", "outline-8", "filled-9", "outline-9", 
"filled-A", "outline-A", "filled-B", "outline-B", "filled-C", "outline-C", 
"filled-D", "outline-D", "filled-E", "outline-E", "filled-F", "outline-F", 
"filled-FHIR_logo", "outline-FHIR_logo", "filled-G", "outline-G", "filled-H", "outline-H", 
"filled-HL7v2_logo", "outline-HL7v2_logo", "filled-I", "outline-I", "filled-J", "outline-J", 
"filled-K", "outline-K", "filled-L", "outline-L", "filled-M", "outline-M", 
"filled-N", "outline-N", "filled-O", "outline-O", "filled-P", "outline-P", 
"filled-Q", "outline-Q", "filled-R", "outline-R", "filled-S", "outline-S", 
"filled-T", "outline-T", "filled-U", "outline-U", "filled-V", "outline-V", 
"filled-W", "outline-W", "filled-X", "outline-X", "filled-Y", "outline-Y", 
"filled-Z", "outline-Z", "filled-accident_and_emergency", "outline-accident_and_emergency", "filled-admissions", "outline-admissions", 
"filled-agriculture", "outline-agriculture", "filled-agriculture_worker", "outline-agriculture_worker", "filled-agriculture_worker_alt", "outline-agriculture_worker_alt", 
"filled-alcohol", "outline-alcohol", "filled-alcohol_cessation", "outline-alcohol_cessation", "filled-alert", "outline-alert", 
"filled-alert_circle", "outline-alert_circle", "filled-alert_triangle", "outline-alert_triangle", "filled-allergies", "outline-allergies", 
"filled-ambulance", "outline-ambulance", "filled-ambulatory_clinic", "outline-ambulatory_clinic", "filled-ancv", "outline-ancv", 
"filled-angry", "outline-angry", "filled-animal_bat", "outline-animal_bat", "filled-animal_chicken", "outline-animal_chicken", 
"filled-animal_cow", "outline-animal_cow", "filled-animal_donkey", "outline-animal_donkey", "filled-animal_mosquitos", "outline-animal_mosquitos", 
"filled-animal_pig", "outline-animal_pig", "filled-animal_rat", "outline-animal_rat", "filled-animal_snake", "outline-animal_snake", 
"filled-animal_spider", "outline-animal_spider", "filled-animal_tick", "outline-animal_tick", "filled-antibody", "outline-antibody", 
"filled-anus", "outline-anus", "filled-arm", "outline-arm", "filled-arm_circumference", "outline-arm_circumference", 
"filled-artificial_intelligence", "outline-artificial_intelligence", "filled-assembly_point", "outline-assembly_point", "filled-asthma", "outline-asthma", 
"filled-asthma_inhaler", "outline-asthma_inhaler", "filled-autoimmune_disease", "outline-autoimmune_disease", "filled-award_ribbon", "outline-award_ribbon", 
"filled-award_trophy", "outline-award_trophy", "filled-baby_0203_alt", "outline-baby_0203_alt", "filled-baby_0203m", "outline-baby_0203m", 
"filled-baby_0306m", "outline-baby_0306m", "filled-baby_female_0203m_alt", "outline-baby_female_0203m_alt", "filled-baby_female_0306m", "outline-baby_female_0306m", 
"filled-baby_female_0609m", "outline-baby_female_0609m", "filled-baby_formula", "outline-baby_formula", "filled-baby_male_0203m_alt", "outline-baby_male_0203m_alt", 
"filled-baby_male_0306m", "outline-baby_male_0306m", "filled-baby_male_0609m", "outline-baby_male_0609m", "filled-back_pain", "outline-back_pain", 
"filled-bacteria", "outline-bacteria", "filled-bandage_adhesive", "outline-bandage_adhesive", "filled-bandaged", "outline-bandaged", 
"filled-basic_motorcycle", "outline-basic_motorcycle", "filled-bike", "outline-bike", "filled-bills", "outline-bills", 
"filled-bio_pharma", "outline-bio_pharma", "filled-biochemistry_laboratory", "outline-biochemistry_laboratory", "filled-biomarker", "outline-biomarker", 
"filled-biopsy", "outline-biopsy", "filled-bladder", "outline-bladder", "filled-bladder_cancer", "outline-bladder_cancer", 
"filled-blister_pills_oval_x1", "outline-blister_pills_oval_x1", "filled-blister_pills_oval_x14", "outline-blister_pills_oval_x14", "filled-blister_pills_oval_x16", "outline-blister_pills_oval_x16", 
"filled-blister_pills_oval_x4", "outline-blister_pills_oval_x4", "filled-blister_pills_round_x1", "outline-blister_pills_round_x1", "filled-blister_pills_round_x14", "outline-blister_pills_round_x14", 
"filled-blister_pills_round_x16", "outline-blister_pills_round_x16", "filled-blister_pills_round_x4", "outline-blister_pills_round_x4", "filled-blood_a_n", "outline-blood_a_n", 
"filled-blood_a_p", "outline-blood_a_p", "filled-blood_ab_n", "outline-blood_ab_n", "filled-blood_ab_p", "outline-blood_ab_p", 
"filled-blood_b_n", "outline-blood_b_n", "filled-blood_b_p", "outline-blood_b_p", "filled-blood_bag", "outline-blood_bag", 
"filled-blood_cells", "outline-blood_cells", "filled-blood_drop", "outline-blood_drop", "filled-blood_o_n", "outline-blood_o_n", 
"filled-blood_o_p", "outline-blood_o_p", "filled-blood_pressure", "outline-blood_pressure", "filled-blood_pressure_2", "outline-blood_pressure_2", 
"filled-blood_pressure_monitor", "outline-blood_pressure_monitor", "filled-blood_rh_n", "outline-blood_rh_n", "filled-blood_rh_p", "outline-blood_rh_p", 
"filled-blood_transfusion", "outline-blood_transfusion", "filled-blood_vessel", "outline-blood_vessel", "filled-body", "outline-body", 
"filled-body_mass_index", "outline-body_mass_index", "filled-book", "outline-book", "filled-boy_0105y", "outline-boy_0105y", 
"filled-boy_1015y", "outline-boy_1015y", "filled-breast_pump", "outline-breast_pump", "filled-breasts", "outline-breasts", 
"filled-breeding_sites", "outline-breeding_sites", "filled-burn", "outline-burn", "filled-burn_unit", "outline-burn_unit", 
"filled-calendar", "outline-calendar", "filled-calendar-quarantine", "outline-calendar-quarantine", "filled-call_centre", "outline-call_centre", 
"filled-calm", "outline-calm", "filled-cancel", "outline-cancel", "filled-cancerous_cell_nuclei", "outline-cancerous_cell_nuclei", 
"filled-cane", "outline-cane", "filled-cannabis", "outline-cannabis", "filled-carbohydrates", "outline-carbohydrates", 
"filled-cardiogram", "outline-cardiogram", "filled-cardiogram_e", "outline-cardiogram_e", "filled-cardiology", "outline-cardiology", 
"filled-cast", "outline-cast", "filled-cell_nuclei", "outline-cell_nuclei", "filled-cervical_cancer", "outline-cervical_cancer", 
"filled-chaplaincy", "outline-chaplaincy", "filled-chart-cured-decreasing", "outline-chart-cured-decreasing", "filled-chart-cured-increasing", "outline-chart-cured-increasing", 
"filled-chart-death-rate-decreasing", "outline-chart-death-rate-decreasing", "filled-chart-death-rate-increasing", "outline-chart-death-rate-increasing", "filled-chart-death-rate-stable", "outline-chart-death-rate-stable", 
"filled-chart-infected-decreasing", "outline-chart-infected-decreasing", "filled-chart-infected-increasing", "outline-chart-infected-increasing", "filled-chart-infected-stable", "outline-chart-infected-stable", 
"filled-chart_bar", "outline-chart_bar", "filled-chart_bar_stacked", "outline-chart_bar_stacked", "filled-chart_line", "outline-chart_line", 
"filled-chart_line_stacked", "outline-chart_line_stacked", "filled-chart_pie", "outline-chart_pie", "filled-chemical_burn", "outline-chemical_burn", 
"filled-child_care", "outline-child_care", "filled-child_cognition", "outline-child_cognition", "filled-child_program", "outline-child_program", 
"filled-chills", "outline-chills", "filled-chills_fever", "outline-chills_fever", "filled-chlamydia", "outline-chlamydia", 
"filled-chlamydia-alt", "outline-chlamydia-alt", "filled-cholera", "outline-cholera", "filled-church", "outline-church", 
"filled-circle_large", "outline-circle_large", "filled-circle_medium", "outline-circle_medium", "filled-circle_small", "outline-circle_small", 
"filled-city", "outline-city", "filled-city_worker", "outline-city_worker", "filled-clean_hands", "outline-clean_hands", 
"filled-cleaning", "outline-cleaning", "filled-clinical_a", "outline-clinical_a", "filled-clinical_f", "outline-clinical_f", 
"filled-clinical_fe", "outline-clinical_fe", "filled-close_policy_gaps", "outline-close_policy_gaps", "filled-close_policy_gaps_alt", "outline-close_policy_gaps_alt", 
"filled-cochlear_implant", "outline-cochlear_implant", "filled-coins", "outline-coins", "filled-cold_chain", "outline-cold_chain", 
"filled-colon", "outline-colon", "filled-colorectal_cancer", "outline-colorectal_cancer", "filled-communication", "outline-communication", 
"filled-community_healthworker", "outline-community_healthworker", "filled-community_meeting", "outline-community_meeting", "filled-cone_test_on_nets", "outline-cone_test_on_nets", 
"filled-cone_test_on_walls", "outline-cone_test_on_walls", "filled-confused", "outline-confused", "filled-construction", "outline-construction", 
"filled-construction_worker", "outline-construction_worker", "filled-contact_lenses", "outline-contact_lenses", "filled-contact_support", "outline-contact_support", 
"filled-contraceptive_diaphragm", "outline-contraceptive_diaphragm", "filled-contraceptive_injection", "outline-contraceptive_injection", "filled-contraceptive_patch", "outline-contraceptive_patch", 
"filled-contraceptive_voucher", "outline-contraceptive_voucher", "filled-copper_iud", "outline-copper_iud", "filled-coronary_care_unit", "outline-coronary_care_unit", 
"filled-coughing", "outline-coughing", "filled-coughing_alt", "outline-coughing_alt", "filled-cpap_machine", "outline-cpap_machine", 
"filled-cpap_masks", "outline-cpap_masks", "filled-cpap_tubes", "outline-cpap_tubes", "filled-cpr", "outline-cpr", 
"filled-credit_card", "outline-credit_card", "filled-crisis_response_center_person", "outline-crisis_response_center_person", "filled-critical_care", "outline-critical_care", 
"filled-cross_country_motorcycle", "outline-cross_country_motorcycle", "filled-crutches", "outline-crutches", "filled-crying", "outline-crying", 
"filled-dairy", "outline-dairy", "filled-database", "outline-database", "filled-deaf", "outline-deaf", 
"filled-death", "outline-death", "filled-death_alt", "outline-death_alt", "filled-death_alt2", "outline-death_alt2", 
"filled-default", "outline-default", "filled-defibrillator", "outline-defibrillator", "filled-dental_hygiene", "outline-dental_hygiene", 
"filled-desktop_app", "outline-desktop_app", "filled-dhis2_logo", "outline-dhis2_logo", "filled-diabetes", "outline-diabetes", 
"filled-diabetes_measure", "outline-diabetes_measure", "filled-diagnostics", "outline-diagnostics", "filled-diarrhea", "outline-diarrhea", 
"filled-discharge", "outline-discharge", "filled-discharge_lounge", "outline-discharge_lounge", "filled-discriminating_concentration_bioassays", "outline-discriminating_concentration_bioassays", 
"filled-disinfecting_wipes", "outline-disinfecting_wipes", "filled-dizzy", "outline-dizzy", "filled-dna", "outline-dna", 
"filled-doctor", "outline-doctor", "filled-doctor_female", "outline-doctor_female", "filled-doctor_male", "outline-doctor_male", 
"filled-dollar", "outline-dollar", "filled-domestic_worker", "outline-domestic_worker", "filled-domestic_worker_alt", "outline-domestic_worker_alt", 
"filled-drone", "outline-drone", "filled-dry_eyes", "outline-dry_eyes", "filled-dry_mouth", "outline-dry_mouth", 
"filled-ear", "outline-ear", "filled-ear_nose_throat", "outline-ear_nose_throat", "filled-ears_nose_and_throat", "outline-ears_nose_and_throat", 
"filled-ecmo", "outline-ecmo", "filled-eco_care", "outline-eco_care", "filled-elderly", "outline-elderly", 
"filled-electricity", "outline-electricity", "filled-emergency_operations_center", "outline-emergency_operations_center", "filled-emergency_post", "outline-emergency_post", 
"filled-endocrinology", "outline-endocrinology", "filled-endotracheal_tube", "outline-endotracheal_tube", "filled-entry", "outline-entry", 
"filled-enzyme", "outline-enzyme", "filled-excel_logo", "outline-excel_logo", "filled-exercise", "outline-exercise", 
"filled-exercise_bicycle", "outline-exercise_bicycle", "filled-exercise_yoga", "outline-exercise_yoga", "filled-expectorate", "outline-expectorate", 
"filled-eye", "outline-eye", "filled-eyeglasses", "outline-eyeglasses", "filled-factory_worker", "outline-factory_worker", 
"filled-family_planning", "outline-family_planning", "filled-female", "outline-female", "filled-female_and_male", "outline-female_and_male", 
"filled-female_condom", "outline-female_condom", "filled-female_reproductive_system", "outline-female_reproductive_system", "filled-female_sex_worker", "outline-female_sex_worker", 
"filled-fetus", "outline-fetus", "filled-fever", "outline-fever", "filled-finance_dept", "outline-finance_dept", 
"filled-fingerprint", "outline-fingerprint", "filled-foot", "outline-foot", "filled-forest", "outline-forest", 
"filled-forest_persons", "outline-forest_persons", "filled-forum", "outline-forum", "filled-fruits", "outline-fruits", 
"filled-gallbladder", "outline-gallbladder", "filled-gastroenterology", "outline-gastroenterology", "filled-general_surgery", "outline-general_surgery", 
"filled-geo_location", "outline-geo_location", "filled-geriatrics", "outline-geriatrics", "filled-ghana", "outline-ghana", 
"filled-girl_0105y", "outline-girl_0105y", "filled-girl_1015y", "outline-girl_1015y", "filled-global-pandemic", "outline-global-pandemic", 
"filled-globe", "outline-globe", "filled-gluten", "outline-gluten", "filled-gluten_free", "outline-gluten_free", 
"filled-gonorrhea", "outline-gonorrhea", "filled-gonorrhea-alt", "outline-gonorrhea-alt", "filled-group_discussion_meeting", "outline-group_discussion_meeting", 
"filled-group_discussion_meetingx3", "outline-group_discussion_meetingx3", "filled-guide_dog", "outline-guide_dog", "filled-gym", "outline-gym", 
"filled-gynecology", "outline-gynecology", "filled-hand-wipe-paper", "outline-hand-wipe-paper", "filled-happy", "outline-happy", 
"filled-hazardous", "outline-hazardous", "filled-head", "outline-head", "filled-head_circumference", "outline-head_circumference", 
"filled-headache", "outline-headache", "filled-health", "outline-health", "filled-health_alt", "outline-health_alt", 
"filled-health_data_security", "outline-health_data_security", "filled-health_data_sync", "outline-health_data_sync", "filled-health_literacy", "outline-health_literacy", 
"filled-health_vulnerability_through_social_determinants", "outline-health_vulnerability_through_social_determinants", "filled-health_worker", "outline-health_worker", "filled-health_worker_form", "outline-health_worker_form", 
"filled-healthcare_it", "outline-healthcare_it", "filled-hearing_aid", "outline-hearing_aid", "filled-heart", "outline-heart", 
"filled-heart_cardiogram", "outline-heart_cardiogram", "filled-heart_organ", "outline-heart_organ", "filled-heartbeat", "outline-heartbeat", 
"filled-height", "outline-height", "filled-helicopter", "outline-helicopter", "filled-hematology", "outline-hematology", 
"filled-hematology_laboratory", "outline-hematology_laboratory", "filled-hepatology", "outline-hepatology", "filled-high_bars", "outline-high_bars", 
"filled-high_level", "outline-high_level", "filled-hiv_ind", "outline-hiv_ind", "filled-hiv_neg", "outline-hiv_neg", 
"filled-hiv_pos", "outline-hiv_pos", "filled-hiv_self_test", "outline-hiv_self_test", "filled-home", "outline-home", 
"filled-home-quarantine", "outline-home-quarantine", "filled-home_alt", "outline-home_alt", "filled-hormonal_ring", "outline-hormonal_ring", 
"filled-hospice", "outline-hospice", "filled-hospital", "outline-hospital", "filled-hospital_symbol", "outline-hospital_symbol", 
"filled-hospitalized", "outline-hospitalized", "filled-hot_meal", "outline-hot_meal", "filled-hpv", "outline-hpv", 
"filled-human_resoruces", "outline-human_resoruces", "filled-i_certificate_paper", "outline-i_certificate_paper", "filled-i_documents_accepted", "outline-i_documents_accepted", 
"filled-i_documents_denied", "outline-i_documents_denied", "filled-i_exam_multiple_choice", "outline-i_exam_multiple_choice", "filled-i_exam_qualification", "outline-i_exam_qualification", 
"filled-i_groups_perspective_crowd", "outline-i_groups_perspective_crowd", "filled-i_note_action", "outline-i_note_action", "filled-i_schedule_school_date_time", "outline-i_schedule_school_date_time", 
"filled-i_training_class", "outline-i_training_class", "filled-i_utensils", "outline-i_utensils", "filled-icd", "outline-icd", 
"filled-icd_10", "outline-icd_10", "filled-icd_11", "outline-icd_11", "filled-icd_9", "outline-icd_9", 
"filled-imm", "outline-imm", "filled-implant", "outline-implant", "filled-info", "outline-info", 
"filled-information_campaign", "outline-information_campaign", "filled-infusion_pump", "outline-infusion_pump", "filled-inpatient", "outline-inpatient", 
"filled-insecticide_resistance", "outline-insecticide_resistance", "filled-insurance_card", "outline-insurance_card", "filled-integrated_data_and_research", "outline-integrated_data_and_research", 
"filled-intensity_concentration_bioassays", "outline-intensity_concentration_bioassays", "filled-intensive_care_unit", "outline-intensive_care_unit", "filled-interoperability", "outline-interoperability", 
"filled-intestinal-pain", "outline-intestinal-pain", "filled-intestine", "outline-intestine", "filled-intravenous_bag", "outline-intravenous_bag", 
"filled-intravenous_drip", "outline-intravenous_drip", "filled-iud", "outline-iud", "filled-job_status_level", "outline-job_status_level", 
"filled-joints", "outline-joints", "filled-justice", "outline-justice", "filled-kidneys", "outline-kidneys", 
"filled-lab_search", "outline-lab_search", "filled-lactation", "outline-lactation", "filled-lactose", "outline-lactose", 
"filled-lactose_free", "outline-lactose_free", "filled-laptop", "outline-laptop", "filled-laryngoscope", "outline-laryngoscope", 
"filled-leg", "outline-leg", "filled-letrina", "outline-letrina", "filled-letrina_alt", "outline-letrina_alt", 
"filled-life_science", "outline-life_science", "filled-liver", "outline-liver", "filled-liver-alt", "outline-liver-alt", 
"filled-llin", "outline-llin", "filled-loinc", "outline-loinc", "filled-loss-smell", "outline-loss-smell", 
"filled-loudly_crying", "outline-loudly_crying", "filled-low_bars", "outline-low_bars", "filled-low_income_level", "outline-low_income_level", 
"filled-low_level", "outline-low_level", "filled-low_vision", "outline-low_vision", "filled-lungs", "outline-lungs", 
"filled-lymph_nodes", "outline-lymph_nodes", "filled-lymphoma", "outline-lymphoma", "filled-machinery", "outline-machinery", 
"filled-magic_wand", "outline-magic_wand", "filled-magnifying_glass", "outline-magnifying_glass", "filled-malaria_microscope", "outline-malaria_microscope", 
"filled-malaria_mixed_microscope", "outline-malaria_mixed_microscope", "filled-malaria_pf_microscope", "outline-malaria_pf_microscope", "filled-malaria_pv_microscope", "outline-malaria_pv_microscope", 
"filled-malaria_testing", "outline-malaria_testing", "filled-male", "outline-male", "filled-male_and_female", "outline-male_and_female", 
"filled-male_condom", "outline-male_condom", "filled-male_sex_worker", "outline-male_sex_worker", "filled-malnutrition", "outline-malnutrition", 
"filled-man", "outline-man", "filled-market_stall", "outline-market_stall", "filled-masked", "outline-masked", 
"filled-measles", "outline-measles", "filled-medical_advice", "outline-medical_advice", "filled-medical_records", "outline-medical_records", 
"filled-medical_sample", "outline-medical_sample", "filled-medical_search", "outline-medical_search", "filled-medicine_bottle", "outline-medicine_bottle", 
"filled-medicine_mortar", "outline-medicine_mortar", "filled-medicines", "outline-medicines", "filled-medium_bars", "outline-medium_bars", 
"filled-medium_level", "outline-medium_level", "filled-megaphone", "outline-megaphone", "filled-mental_disorders", "outline-mental_disorders", 
"filled-mental_health", "outline-mental_health", "filled-microscope", "outline-microscope", "filled-microscope_with_specimen", "outline-microscope_with_specimen", 
"filled-military_worker", "outline-military_worker", "filled-miner_worker", "outline-miner_worker", "filled-miner_worker_alt", "outline-miner_worker_alt", 
"filled-ministry_of_health", "outline-ministry_of_health", "filled-mobile", "outline-mobile", "filled-mobile_clinic", "outline-mobile_clinic", 
"filled-money_bag", "outline-money_bag", "filled-mosque", "outline-mosque", "filled-mosquito", "outline-mosquito", 
"filled-mosquito_collection", "outline-mosquito_collection", "filled-mouth", "outline-mouth", "filled-msm", "outline-msm", 
"filled-nappy_diaper", "outline-nappy_diaper", "filled-nausea", "outline-nausea", "filled-nauseous", "outline-nauseous", 
"filled-negative", "outline-negative", "filled-nephrology", "outline-nephrology", "filled-nerve", "outline-nerve", 
"filled-nervous", "outline-nervous", "filled-network_4g", "outline-network_4g", "filled-network_5g", "outline-network_5g", 
"filled-neuro_surgery", "outline-neuro_surgery", "filled-neurology", "outline-neurology", "filled-neutral", "outline-neutral", 
"filled-no", "outline-no", "filled-nose", "outline-nose", "filled-not_ok", "outline-not_ok", 
"filled-nurse", "outline-nurse", "filled-nutrition", "outline-nutrition", "filled-observation", "outline-observation", 
"filled-obstetricsmonia", "outline-obstetricsmonia", "filled-occupational_therapy", "outline-occupational_therapy", "filled-odontology", "outline-odontology", 
"filled-odontology_implant", "outline-odontology_implant", "filled-oesophagus_cancer", "outline-oesophagus_cancer", "filled-officer", "outline-officer", 
"filled-ok", "outline-ok", "filled-old_man", "outline-old_man", "filled-old_woman", "outline-old_woman", 
"filled-oncology", "outline-oncology", "filled-openMRS_logo", "outline-openMRS_logo", "filled-opthalmology", "outline-opthalmology", 
"filled-oral_contraception_pillsx21", "outline-oral_contraception_pillsx21", "filled-oral_contraception_pillsx28", "outline-oral_contraception_pillsx28", "filled-orthopaedics", "outline-orthopaedics", 
"filled-orthotics", "outline-orthotics", "filled-outbreak", "outline-outbreak", "filled-outpatient", "outline-outpatient", 
"filled-outpatient_department", "outline-outpatient_department", "filled-overweight", "outline-overweight", "filled-oxygen_tank", "outline-oxygen_tank", 
"filled-pain", "outline-pain", "filled-pain_managment", "outline-pain_managment", "filled-palliative-care", "outline-palliative-care", 
"filled-palm_branches_roof", "outline-palm_branches_roof", "filled-pancreas", "outline-pancreas", "filled-pancreatic_cancer", "outline-pancreatic_cancer", 
"filled-patient_band", "outline-patient_band", "filled-patient_band_alt", "outline-patient_band_alt", "filled-paved_road", "outline-paved_road", 
"filled-paved_road_alt", "outline-paved_road_alt", "filled-peace", "outline-peace", "filled-pediatric_surgery", "outline-pediatric_surgery", 
"filled-pediatrics", "outline-pediatrics", "filled-penis", "outline-penis", "filled-penis_alt", "outline-penis_alt", 
"filled-people", "outline-people", "filled-person", "outline-person", "filled-pharmacy", "outline-pharmacy", 
"filled-pharmacy_alt", "outline-pharmacy_alt", "filled-phone", "outline-phone", "filled-physical_therapy", "outline-physical_therapy", 
"filled-pill_1", "outline-pill_1", "filled-pills_2", "outline-pills_2", "filled-pills_3", "outline-pills_3", 
"filled-pills_4", "outline-pills_4", "filled-plantation_worker", "outline-plantation_worker", "filled-plantation_worker_alt", "outline-plantation_worker_alt", 
"filled-pneumonia", "outline-pneumonia", "filled-poison", "outline-poison", "filled-polygon", "outline-polygon", 
"filled-positive", "outline-positive", "filled-ppe-face-shield-alt", "outline-ppe-face-shield-alt", "filled-ppe-mask", "outline-ppe-mask", 
"filled-ppe_apron", "outline-ppe_apron", "filled-ppe_face_mask", "outline-ppe_face_mask", "filled-ppe_face_shield", "outline-ppe_face_shield", 
"filled-ppe_gloves", "outline-ppe_gloves", "filled-ppe_goggles", "outline-ppe_goggles", "filled-ppe_gown", "outline-ppe_gown", 
"filled-ppe_mask_n95", "outline-ppe_mask_n95", "filled-ppe_sanitizer", "outline-ppe_sanitizer", "filled-ppe_santizer_alt", "outline-ppe_santizer_alt", 
"filled-ppe_suit", "outline-ppe_suit", "filled-pregnant", "outline-pregnant", "filled-pregnant_0812w", "outline-pregnant_0812w", 
"filled-pregnant_2426w", "outline-pregnant_2426w", "filled-pregnant_32w", "outline-pregnant_32w", "filled-pregnant_3638w", "outline-pregnant_3638w", 
"filled-prescription_document", "outline-prescription_document", "filled-prisoner", "outline-prisoner", "filled-proper_roof", "outline-proper_roof", 
"filled-prostate", "outline-prostate", "filled-prostate_cancer", "outline-prostate_cancer", "filled-provider_fst", "outline-provider_fst", 
"filled-psychology", "outline-psychology", "filled-pulse_oximeter", "outline-pulse_oximeter", "filled-pulse_oximeter_alt", "outline-pulse_oximeter_alt", 
"filled-pwid", "outline-pwid", "filled-qr_code", "outline-qr_code", "filled-question", "outline-question", 
"filled-question_circle", "outline-question_circle", "filled-question_mark", "outline-question_mark", "filled-question_triangle", "outline-question_triangle", 
"filled-radiology", "outline-radiology", "filled-rdt_result", "outline-rdt_result", "filled-rdt_result_invalid", "outline-rdt_result_invalid", 
"filled-rdt_result_mixed", "outline-rdt_result_mixed", "filled-rdt_result_mixed_invalid", "outline-rdt_result_mixed_invalid", "filled-rdt_result_mixed_invalid_rectangular", "outline-rdt_result_mixed_invalid_rectangular", 
"filled-rdt_result_mixed_rectangular", "outline-rdt_result_mixed_rectangular", "filled-rdt_result_neg", "outline-rdt_result_neg", "filled-rdt_result_neg_invalid", "outline-rdt_result_neg_invalid", 
"filled-rdt_result_neg_invalid_rectangular", "outline-rdt_result_neg_invalid_rectangular", "filled-rdt_result_neg_rectangular", "outline-rdt_result_neg_rectangular", "filled-rdt_result_no_test", "outline-rdt_result_no_test", 
"filled-rdt_result_out_stock", "outline-rdt_result_out_stock", "filled-rdt_result_pf", "outline-rdt_result_pf", "filled-rdt_result_pf_invalid", "outline-rdt_result_pf_invalid", 
"filled-rdt_result_pf_invalid_rectangular", "outline-rdt_result_pf_invalid_rectangular", "filled-rdt_result_pf_rectangular", "outline-rdt_result_pf_rectangular", "filled-rdt_result_positive", "outline-rdt_result_positive", 
"filled-rdt_result_pv", "outline-rdt_result_pv", "filled-rdt_result_pv_invalid", "outline-rdt_result_pv_invalid", "filled-rdt_result_pv_invalid_rectangular", "outline-rdt_result_pv_invalid_rectangular", 
"filled-rdt_result_pv_rectangular", "outline-rdt_result_pv_rectangular", "filled-referral", "outline-referral", "filled-refused", "outline-refused", 
"filled-register_book", "outline-register_book", "filled-regular_patient", "outline-regular_patient", "filled-resilient_and_migration_sensitive_health_system", "outline-resilient_and_migration_sensitive_health_system", 
"filled-respirator", "outline-respirator", "filled-respirology", "outline-respirology", "filled-rheumatology", "outline-rheumatology", 
"filled-ribbon", "outline-ribbon", "filled-risk_analysis", "outline-risk_analysis", "filled-rmnh", "outline-rmnh", 
"filled-running", "outline-running", "filled-running_water", "outline-running_water", "filled-running_water_alt", "outline-running_water_alt", 
"filled-rupee", "outline-rupee", "filled-rural_post", "outline-rural_post", "filled-rural_post_alt", "outline-rural_post_alt", 
"filled-rx", "outline-rx", "filled-sad", "outline-sad", "filled-sayana_press", "outline-sayana_press", 
"filled-secure_communication", "outline-secure_communication", "filled-security_worker", "outline-security_worker", "filled-sexual_reproductive_health", "outline-sexual_reproductive_health", 
"filled-simple_logo", "outline-simple_logo", "filled-skeleton", "outline-skeleton", "filled-skin_cancer", "outline-skin_cancer", 
"filled-skull", "outline-skull", "filled-sleepy", "outline-sleepy", "filled-sling", "outline-sling", 
"filled-small_plane", "outline-small_plane", "filled-smoking", "outline-smoking", "filled-smoking_cessation", "outline-smoking_cessation", 
"filled-smoking_cessation_alt", "outline-smoking_cessation_alt", "filled-social_distancing", "outline-social_distancing", "filled-social_distancing_alt", "outline-social_distancing_alt", 
"filled-social_work", "outline-social_work", "filled-sodium_free", "outline-sodium_free", "filled-sonogram", "outline-sonogram", 
"filled-sonography", "outline-sonography", "filled-speech_language_therapy", "outline-speech_language_therapy", "filled-sperm", "outline-sperm", 
"filled-spine", "outline-spine", "filled-spleen", "outline-spleen", "filled-spraying", "outline-spraying", 
"filled-spreadsheets", "outline-spreadsheets", "filled-square_large", "outline-square_large", "filled-square_medium", "outline-square_medium", 
"filled-square_small", "outline-square_small", "filled-staples", "outline-staples", "filled-star_large", "outline-star_large", 
"filled-star_medium", "outline-star_medium", "filled-star_small", "outline-star_small", "filled-stent", "outline-stent", 
"filled-stethoscope", "outline-stethoscope", "filled-sti", "outline-sti", "filled-stitches", "outline-stitches", 
"filled-stock_out", "outline-stock_out", "filled-stomach", "outline-stomach", "filled-stomach_cancer", "outline-stomach_cancer", 
"filled-stop", "outline-stop", "filled-sugar", "outline-sugar", "filled-sugar_alt", "outline-sugar_alt", 
"filled-sugar_free", "outline-sugar_free", "filled-surgical_sterilization", "outline-surgical_sterilization", "filled-surveilance_officer", "outline-surveilance_officer", 
"filled-sweating", "outline-sweating", "filled-swim", "outline-swim", "filled-symptom", "outline-symptom", 
"filled-synergist_insecticide_bioassays", "outline-synergist_insecticide_bioassays", "filled-syphilis-alt", "outline-syphilis-alt", "filled-syringe", "outline-syringe", 
"filled-syringe-vaccine", "outline-syringe-vaccine", "filled-tac", "outline-tac", "filled-tally", "outline-tally", 
"filled-tb", "outline-tb", "filled-telemedicine", "outline-telemedicine", "filled-temple", "outline-temple", 
"filled-temple_alt", "outline-temple_alt", "filled-test_tubes", "outline-test_tubes", "filled-testicles", "outline-testicles", 
"filled-thermometer", "outline-thermometer", "filled-thermometer_digital", "outline-thermometer_digital", "filled-thyroid", "outline-thyroid", 
"filled-thyroid_cancer", "outline-thyroid_cancer", "filled-tissue", "outline-tissue", "filled-toilet_paper", "outline-toilet_paper", 
"filled-tongue", "outline-tongue", "filled-tooth", "outline-tooth", "filled-transgender", "outline-transgender", 
"filled-traumatism", "outline-traumatism", "filled-travel", "outline-travel", "filled-travel_alt", "outline-travel_alt", 
"filled-treated_water", "outline-treated_water", "filled-triangle_inverted_large", "outline-triangle_inverted_large", "filled-triangle_inverted_medium", "outline-triangle_inverted_medium", 
"filled-triangle_inverted_small", "outline-triangle_inverted_small", "filled-triangle_large", "outline-triangle_large", "filled-triangle_medium", "outline-triangle_medium", 
"filled-triangle_small", "outline-triangle_small", "filled-truck_driver", "outline-truck_driver", "filled-tumour", "outline-tumour", 
"filled-ui_folder", "outline-ui_folder", "filled-ui_folder_family", "outline-ui_folder_family", "filled-ui_menu", "outline-ui_menu", 
"filled-ui_menu_grid", "outline-ui_menu_grid", "filled-ui_preferences", "outline-ui_preferences", "filled-ui_secure", "outline-ui_secure", 
"filled-ui_settings", "outline-ui_settings", "filled-ui_user_profile", "outline-ui_user_profile", "filled-ui_zoom", "outline-ui_zoom", 
"filled-ui_zoom_in", "outline-ui_zoom_in", "filled-ui_zoom_out", "outline-ui_zoom_out", "filled-ultrasound_scanner", "outline-ultrasound_scanner", 
"filled-umbrella", "outline-umbrella", "filled-un_paved_road", "outline-un_paved_road", "filled-underweight", "outline-underweight", 
"filled-unhealthy_food", "outline-unhealthy_food", "filled-urine_sample", "outline-urine_sample", "filled-urology", "outline-urology", 
"filled-vagina", "outline-vagina", "filled-vagina_alt", "outline-vagina_alt", "filled-varicose_vein", "outline-varicose_vein", 
"filled-vascular_surgery", "outline-vascular_surgery", "filled-vegetables", "outline-vegetables", "filled-ventilator", "outline-ventilator", 
"filled-ventilator_alt", "outline-ventilator_alt", "filled-vespa_motorcycle", "outline-vespa_motorcycle", "filled-vih", "outline-vih", 
"filled-village", "outline-village", "filled-viral_lung_infection", "outline-viral_lung_infection", "filled-virus", "outline-virus", 
"filled-virus-mutation", "outline-virus-mutation", "filled-virus-research", "outline-virus-research", "filled-virus-sanitizer-spray", "outline-virus-sanitizer-spray", 
"filled-virus-shield", "outline-virus-shield", "filled-virus_alt", "outline-virus_alt", "filled-virus_lab_research_syringe", "outline-virus_lab_research_syringe", 
"filled-virus_lab_research_test_tube", "outline-virus_lab_research_test_tube", "filled-virus_patient", "outline-virus_patient", "filled-virus_research_alt", "outline-virus_research_alt", 
"filled-vomiting", "outline-vomiting", "filled-vomitting", "outline-vomitting", "filled-waist_circumference", "outline-waist_circumference", 
"filled-walk_supported", "outline-walk_supported", "filled-walking", "outline-walking", "filled-war", "outline-war", 
"filled-wash_hands", "outline-wash_hands", "filled-water_sanitation", "outline-water_sanitation", "filled-water_treatment", "outline-water_treatment", 
"filled-weight", "outline-weight", "filled-weights", "outline-weights", "filled-wheelchair", "outline-wheelchair", 
"filled-wheelchair_alt", "outline-wheelchair_alt", "filled-woman", "outline-woman", "filled-woozy", "outline-woozy", 
"filled-world_care", "outline-world_care", "filled-xray", "outline-xray", "filled-yen", "outline-yen", 
"filled-yes", "outline-yes", "filled-young_people", "outline-young_people",
];

let currentLibrary = 'bootstrap';
let filteredIcons = [];
let currentColor = 'primary';

  const searchInput = document.getElementById("searchInput");
  const searchButton = document.getElementById("searchButton");
  const imageResults = document.getElementById("imageResults");

  // API Keys - Replace with your actual API keys
  const API_KEYS = {
    pexels: "wI88ax9G8jByJwMyCBlENiwUUCcmJkArWLXdJSMCchuy5qhviYM62qwr",
    unsplash: "o5FhvPrfnVET4_0LxyD39Asj6hV0LOFD4dlEfIVt30o",
    pixabay: "49680203-90ccf9cd87614f606c7f0ccae",
  };

// Modified version of your existing code
const navContainer = document.getElementById("dynamicNavItems");
const filterInput = document.getElementById("componentFilter");



  // Store a reference to the currently edited element
  let currentEditTarget = null;
  let currentEditingCard = null;

  const iconStates = new Map(); // Key: element ID, Value: { type: 'bootstrap'|'iconify', name: string }








async function showToast(message, type = 'success') {
  const toastElement = document.getElementById('liveToast');
  const toastBody = document.getElementById('toastBody');
  const toastIcon = document.getElementById('toastIcon');
  const toastHeader = toastElement.querySelector('.toast-header');
  
  toastBody.textContent = message;
  
  // Clear previous icon and styles
  toastIcon.className = '';
  toastHeader.style.border = '';
  toastHeader.style.color = '';
  
  if (type === 'success') {
    // Green tick icon (Bootstrap check icon)
    toastIcon.className = 'bi bi-check-circle text-success me-2'; 
    toastIcon.style.fontSize = '2rem';
    toastHeader.style.border = 'white'; 
    toastHeader.style.color = 'white';
    toastHeader.style.backgroundColor = '#006272'; 
    toastBody.style.border = '1px solid #006272'; 
  } else if (type === 'error') {
    // Red X icon (Bootstrap x icon)
    toastIcon.className = 'bi bi-x-circle text-danger me-2';
    toastIcon.style.fontSize = '2rem';
    toastHeader.style.border = 'white';
    toastHeader.style.color = 'white';
    toastHeader.style.backgroundColor = '#df4661'; 
    toastBody.style.border = '1px solid #df4661'; 
  }
  const toast = new bootstrap.Toast(toastElement);
  toast.show();
}

// Combined search for all three APIs
function searchAllApis(query) {
  imageResults.innerHTML = '<div class="text-center"><div class="spinner-border" role="status"></div></div>';

  // Helper to safely fetch and parse JSON with error handling
  function safeFetch(url, options) {
    return fetch(url, options)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        return res.json();
      })
      .catch(error => {
        console.error("API fetch error:", error);
        // Return fallback empty data structure depending on API expected format
        return null; // Indicating failure, to be handled below
      });
  }

  const pexelsPromise = safeFetch(
    `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=100`,
    { headers: { Authorization: API_KEYS.pexels } }
  );

  const unsplashPromise = safeFetch(
    `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=100`,
    { headers: { Authorization: `Client-ID ${API_KEYS.unsplash}` } }
  );

  const pixabayPromise = safeFetch(
    `https://pixabay.com/api/?key=${API_KEYS.pixabay}&q=${encodeURIComponent(query)}&image_type=photo&per_page=100`
  );

  Promise.all([pexelsPromise, unsplashPromise, pixabayPromise])
    .then(([pexelsData, unsplashData, pixabayData]) => {
      const pexelsImages = pexelsData && pexelsData.photos
        ? pexelsData.photos.map(photo => ({
            id: photo.id,
            thumbnail: photo.src.medium,
            fullsize: photo.src.original,
            alt: photo.photographer,
            source: "Pexels",
          }))
        : [];

      const unsplashImages = unsplashData && unsplashData.results
        ? unsplashData.results.map(photo => ({
            id: photo.id,
            thumbnail: photo.urls.small,
            fullsize: photo.urls.full,
            alt: photo.alt_description || photo.description || "Unsplash image",
            source: "Unsplash",
          }))
        : [];

      const pixabayImages = pixabayData && pixabayData.hits
        ? pixabayData.hits.map(photo => ({
            id: photo.id,
            thumbnail: photo.webformatURL,
            fullsize: photo.largeImageURL,
            alt: photo.tags,
            source: "Pixabay",
          }))
        : [];

      // Interleave images: pexels, unsplash, pixabay, repeat
      const combinedImages = [];
      const maxLen = Math.max(pexelsImages.length, unsplashImages.length, pixabayImages.length);

      for (let i = 0; i < maxLen; i++) {
        if (pexelsImages[i]) combinedImages.push(pexelsImages[i]);
        if (unsplashImages[i]) combinedImages.push(unsplashImages[i]);
        if (pixabayImages[i]) combinedImages.push(pixabayImages[i]);
      }

      if (combinedImages.length === 0) {
        imageResults.innerHTML = '<div class="alert alert-warning">No images found from any source.</div>';
      } else {
        displayImages(combinedImages);
      }
    })
    .catch(error => {
      // This catch is unlikely to run unless Promise.all itself fails unexpectedly
      imageResults.innerHTML = `<div class="alert alert-danger">Unexpected error: ${error.message}</div>`;
      console.error(error);
    });
}



  function displayImages(images) {
  if (images.length === 0) {
    imageResults.innerHTML =
      '<div class="alert alert-warning">No images found</div>';
    return;
  }

  let html = '<div class="row">';
  images.forEach((image) => {
    html += `
      <div class="col-6 mb-1">
        <div class="card">
          <img src="${image.thumbnail}" class="card-img-top" alt="${image.alt}" style="height: 30vh; object-fit: cover;">
          <div class="card-body" style="padding:0.25rem;">
            <button style="margin: 0.25rem;" class="btn btn-sm btn-success select-image" data-image="${image.fullsize}">Select</button>
            <button style="margin: 0.25rem;" class="btn btn-sm btn-primary select-header" data-image="${image.fullsize}">Header</button>
          </div>
        </div>
      </div>
    `;
  });
  html += "</div>";

  imageResults.innerHTML = html;

  // Add event listeners to select buttons
  document.querySelectorAll(".select-image").forEach((button) => {
    button.addEventListener("click", function () {
      const imageUrl = this.getAttribute("data-image");
      selectImage(imageUrl);
    });
  });

  // Add event listeners to header buttons
  document.querySelectorAll(".select-header").forEach((button) => {
    button.addEventListener("click", function () {
      const imageUrl = this.getAttribute("data-image");
      selectHeaderImage(imageUrl);
    });
  });
}

  function selectImage(imageUrl) {
    // Log the selected image
    console.log("Selected image:", imageUrl);

    // Copy the image to clipboard
    copyImageToClipboard(imageUrl)
      .then(() => {
        console.log("Image copied to clipboard successfully");
        showToast('Compressed image copied to Clipboard', 'success');
      })
      .catch((error) => {
        console.error("Failed to copy image to clipboard:", error);
        showToast('Failed to copy image to Clipboard', 'error');
      });

    // Optionally, still dispatch an event for other parts of your application
    const event = new CustomEvent("imagePicked", { detail: { url: imageUrl } });
    document.dispatchEvent(event);

    // Close the offcanvas
    const offcanvasElement = document.getElementById("imagePickerOffcanvas");
    const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement);
    offcanvas.hide();
  }

  function selectHeaderImage(imageUrl) {
  console.log("Selected header image:", imageUrl);

  // Copy the image as header to clipboard
  copyImageAsHeader(imageUrl)
    .then(() => {
      console.log("Header image copied to clipboard successfully");
      showToast('Header image copied to Clipboard', 'success');
    })
    .catch((error) => {
      console.error("Failed to copy header image to clipboard:", error);
      showToast('Failed to copy header image to Clipboard', 'error');
    });

  // Dispatch custom event
  const event = new CustomEvent("headerImagePicked", { detail: { url: imageUrl } });
  document.dispatchEvent(event);

  // Close the offcanvas
  const offcanvasElement = document.getElementById("imagePickerOffcanvas");
  const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement);
  offcanvas.hide();
}


async function copyImageToClipboard(imageUrl) {
  try {
    const response = await fetch(imageUrl);
    if (!response.ok) throw new Error('Failed to fetch image');
    
    const blob = await response.blob();
    
    // Ultra-aggressive multi-pass compression - only downscale if needed
    const ultraCompressedBlob = await aggressiveCompress(blob, {
      maxWidth: 1920,
      maxHeight: 1920,
      targetSizeKB: 500, // Target file size in KB
      minQuality: 0.1,   // Minimum acceptable quality
      maxQuality: 0.9    // Starting quality
    });
    
    await navigator.clipboard.write([
      new ClipboardItem({ 'image/png': ultraCompressedBlob })
    ]);
    
    console.log(`Image compressed from ${(blob.size / 1024).toFixed(0)}KB to ${(ultraCompressedBlob.size / 1024).toFixed(0)}KB`);
    return true;
    
  } catch (error) {
    console.error('Failed to copy image:', error);
    showToast('Failed to copy image to clipboard.', 'error');
    throw error;
  }
}

async function aggressiveCompress(blob, options) {
  const {
    maxWidth = 1920,
    maxHeight = 1080,
    targetSizeKB = 500,
    minQuality = 0.1,
    maxQuality = 0.9
  } = options;
  
  // Step 1: Only resize if image is larger than limits
  let currentBlob = await conditionalResize(blob, maxWidth, maxHeight, 0.9);
  
  // Step 2: Progressive quality reduction until target size is reached
  if (currentBlob.size > targetSizeKB * 1024) {
    currentBlob = await progressiveQualityReduction(currentBlob, targetSizeKB, minQuality, maxQuality);
  }
  
  // Step 3: If still too large, reduce quality further (but never resize below original if smaller)
  if (currentBlob.size > targetSizeKB * 1024) {
    currentBlob = await progressiveQualityReduction(currentBlob, targetSizeKB, 0.05, minQuality);
  }
  
  return currentBlob;
}

function conditionalResize(blob, maxWidth, maxHeight, quality) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    img.onload = function() {
      const originalWidth = img.naturalWidth;
      const originalHeight = img.naturalHeight;
      
      // Check if resizing is needed
      const needsResize = shouldResize(originalWidth, originalHeight, maxWidth, maxHeight);
      
      if (!needsResize) {
        // Image is small enough - just recompress for quality/size optimization
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        canvas.width = originalWidth;
        canvas.height = originalHeight;
        
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0);
        
        canvas.toBlob(resolve, 'image/png', quality);
        URL.revokeObjectURL(img.src);
        return;
      }
      
      // Image is too large - resize it down
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      const { width, height } = calculateDimensions(
        originalWidth, 
        originalHeight, 
        maxWidth, 
        maxHeight
      );
      
      canvas.width = width;
      canvas.height = height;
      
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, 0, 0, width, height);
      
      canvas.toBlob(resolve, 'image/png', quality);
      URL.revokeObjectURL(img.src);
    };
    
    img.onerror = reject;
    img.src = URL.createObjectURL(blob);
  });
}

function shouldResize(originalWidth, originalHeight, maxWidth, maxHeight) {
  // Determine if image is horizontal or vertical
  const isHorizontal = originalWidth >= originalHeight;
  
  if (isHorizontal) {
    // For horizontal images, only resize if width > 1920
    return originalWidth > maxWidth;
  } else {
    // For vertical images, only resize if height > 1920  
    return originalHeight > maxWidth; // Using maxWidth (1920) as the threshold for vertical too
  }
}

async function progressiveQualityReduction(blob, targetSizeKB, minQuality, maxQuality) {
  let currentQuality = maxQuality;
  let currentBlob = blob;
  const qualityStep = 0.1;
  
  while (currentBlob.size > targetSizeKB * 1024 && currentQuality >= minQuality) {
    currentQuality -= qualityStep;
    currentBlob = await recompressBlob(currentBlob, currentQuality);
    console.log(`Quality: ${currentQuality.toFixed(1)}, Size: ${(currentBlob.size / 1024).toFixed(0)}KB`);
  }
  
  return currentBlob;
}

function recompressBlob(blob, quality) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    img.onload = function() {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      canvas.width = img.width;
      canvas.height = img.height;
      
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      
      ctx.drawImage(img, 0, 0);
      canvas.toBlob(resolve, 'image/png', quality);
      URL.revokeObjectURL(img.src);
    };
    
    img.onerror = reject;
    img.src = URL.createObjectURL(blob);
  });
}

function calculateDimensions(originalWidth, originalHeight, maxWidth, maxHeight) {
  let width = originalWidth;
  let height = originalHeight;
  
  const widthRatio = maxWidth / width;
  const heightRatio = maxHeight / height;
  const ratio = Math.min(widthRatio, heightRatio, 1); // The "1" ensures we never upscale
  
  width = Math.round(width * ratio);
  height = Math.round(height * ratio);
  
  return { width, height };
}

async function copyImageAsHeader(imageUrl) {
  try {
    const response = await fetch(imageUrl);
    if (!response.ok) throw new Error('Failed to fetch image');
    
    const blob = await response.blob();
    
    // Crop to header format (4:1 ratio, typically 1920x480)
    const headerBlob = await cropToHeader(blob, {
      targetWidth: 1920,
      targetHeight: 480,
      quality: 0.9
    });
    
    await navigator.clipboard.write([
      new ClipboardItem({ 'image/png': headerBlob })
    ]);
    
    console.log(`Header image created: ${headerBlob.size / 1024}KB (1920x480)`);
    return true;
    
  } catch (error) {
    console.error('Failed to copy header image:', error);
    showToast('Failed to copy header image to clipboard.', 'error');
    throw error;
  }
}

async function cropToHeader(blob, options) {
  const { targetWidth = 1920, targetHeight = 480, quality = 0.9 } = options;
  
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    img.onload = function() {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      // Set final dimensions
      canvas.width = targetWidth;
      canvas.height = targetHeight;
      
      const originalWidth = img.naturalWidth;
      const originalHeight = img.naturalHeight;
      
      // Calculate how to crop for 4:1 aspect ratio
      const targetAspectRatio = targetWidth / targetHeight; // 4:1
      const originalAspectRatio = originalWidth / originalHeight;
      
      let sourceX, sourceY, sourceWidth, sourceHeight;
      
      if (originalAspectRatio > targetAspectRatio) {
        // Image is wider than needed - crop sides
        sourceHeight = originalHeight;
        sourceWidth = originalHeight * targetAspectRatio;
        sourceX = (originalWidth - sourceWidth) / 2;
        sourceY = 0;
      } else {
        // Image is taller than needed - crop top/bottom
        sourceWidth = originalWidth;
        sourceHeight = originalWidth / targetAspectRatio;
        sourceX = 0;
        sourceY = (originalHeight - sourceHeight) / 2;
      }
      
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      
      // Draw the cropped and scaled image
      ctx.drawImage(
        img, 
        sourceX, sourceY, sourceWidth, sourceHeight,  // Source crop area
        0, 0, targetWidth, targetHeight               // Destination area
      );
      
      canvas.toBlob(resolve, 'image/png', quality);
      URL.revokeObjectURL(img.src);
    };
    
    img.onerror = reject;
    img.src = URL.createObjectURL(blob);
  });
}


function isClipboardAPISupported() {
  return navigator.clipboard && window.isSecureContext;
}

async function copyForD2LTinyMCE(htmlString) {
  if (!isClipboardAPISupported()) {
    const fallbackContent = `<!-- x-tinymce/html -->  ${htmlString} `;
    console.log("=== CLIPBOARD CONTENT (FALLBACK) ===");
    console.log("Content to copy:", fallbackContent);
    return fallbackCopyForTinyMCE(fallbackContent);
  }
  
  const tinymceFormattedHtml = `<!-- x-tinymce/html -->  ${htmlString} `;
  
  // Log exactly what's going into the clipboard
  console.log("=== CLIPBOARD CONTENT (MODERN API) ===");
  console.log("text/html:", tinymceFormattedHtml);

  try {
    await navigator.clipboard.write([
      new ClipboardItem({
        "text/html": new Blob([tinymceFormattedHtml], { type: "text/html" }),
      }),
    ]);
    showToast("Content copied - paste directly into D2L editor", 'success');
    return true;
  } catch (err) {
    console.error("Modern clipboard API failed:", err);
    return fallbackCopyForTinyMCE(tinymceFormattedHtml);
  }
}

// Fallback using execCommand
function fallbackCopyForTinyMCE(formattedHtml) {
  const tempContainer = document.createElement("div");
  let success = false;
  
  console.log("=== CLIPBOARD CONTENT (FALLBACK METHOD) ===");
  console.log("Content to copy:", formattedHtml);
  
  try {
    tempContainer.innerHTML = `<div contenteditable="false"> ${formattedHtml} </div>`;
    document.body.appendChild(tempContainer);

    tempContainer.style.position = "absolute";
    tempContainer.style.left = "-9999px";
    tempContainer.style.top = "0";
    tempContainer.contentEditable = "true";

    // Select the content
    tempContainer.focus();
    const range = document.createRange();
    range.selectNodeContents(tempContainer);

    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);

    success = document.execCommand("copy");
    
    if (success) {
      showToast("Content copied - paste directly into D2L editor", 'success');
    } else {
      showToast("Failed to copy as rich text", 'error');
    }
    
  } catch (err) {
    console.error("Error during fallback copy:", err);
    showToast("Error during copy operation", 'error');
  } finally {
    if (tempContainer.parentNode) {
      const selection = window.getSelection();
      setTimeout(() => {
        selection.removeAllRanges();
        document.body.removeChild(tempContainer);
      }, 100);
    }
  }
  
  return success;
}

// Universal Copy Function  
function universalCopy(code, isWysiwyg = false, skipWrapper = false, buttonId = null) {
  const rowCopyButtons = ['copyNewRowTinyMCE', 'copy10RowsTinyMCE', 'copy10RowsHtml', 'copyNewRowHtml'];
  const shouldSkipWrapper = skipWrapper || (buttonId && rowCopyButtons.includes(buttonId));
  const finalCode = shouldSkipWrapper ? code : `<div contenteditable="false">${code}</div>`;

  // Derive a human-readable label from the calling button if possible
  const callerBtn = buttonId ? document.getElementById(buttonId) : null;
  const label = callerBtn?.textContent?.trim() || 'Component';

  // Notify the edit-page Tampermonkey script (clipboard history)
  try {
    window.opener?.postMessage({ type: 'bb-copy', label, html: finalCode }, '*');
    window.parent?.postMessage({ type: 'bb-copy', label, html: finalCode }, '*');
  } catch { /* cross-origin opener may throw — safe to ignore */ }

  if (isWysiwyg) {
    copyForD2LTinyMCE(finalCode).catch((err) => {
      if (err.name === 'NotAllowedError') {
        showToast("Permission denied - please allow clipboard access", 'error');
      } else {
        navigator.clipboard
          .writeText(finalCode)
          .then(() => showToast("Copied as plain HTML code - paste in HTML view", 'error'))
          .catch(() => showToast("Copy failed completely", 'error'));
      }
    });
  } else {
    navigator.clipboard
      .writeText(finalCode)
      .then(() => showToast("Copied", "success"))
      .catch(() => showToast("Copy failed", 'error'));
  }
}




function generateComponentCode(container, contentContainer, name) {
    const clone = container.cloneNode(true);
    const componentType = name.toLowerCase().replace(/\s+/g, "-");

    if (clone.classList.contains("component-container")) {
        clone.classList.remove("component-container");
    }

    // Apply icon states to cloned elements
    clone.querySelectorAll("[data-component-id]").forEach((component) => {
        const componentId = component.dataset.componentId;
        const state = iconStates.get(componentId);
        if (!state) return;

        const iconParent = component.querySelector(".d-flex, .icon-column, li, .accordion-button");
        if (!iconParent) return;

        // Clear existing icons
        iconParent.querySelectorAll("i, .iconify").forEach((icon) => icon.remove());

        // Add correct icon based on type — delegates to the same helper the
        // live preview uses, so all 5 libraries export correctly instead of
        // only Bootstrap/Health Icons surviving the copy step.
        iconParent.prepend(createIconElement(state.icon, state.type));
    });

          let code = clone.outerHTML;

          // Handle ID updates based on component type
          if (name === "Image Carousels") {
            code = updateCarouselIds(code);
          } else if (name === "Text Carousels") {
            code = updateTextCarouselIds(code);
          } else if (
            [
              "Tabs",
              "Pills",
              "Accordions",
              "Numbered Accordions",
              "Icon Accordions",
            ].includes(name)
          ) {
            code = updateComponentIds(code, componentType);
          } else if (name === "Click and Reveal") {
            code = updateComponentIds(code, "reveal");
          } else if (name === "Icon Lists") {
            code = generateIconListCode(container);
          } else {
            code = updateComponentIds(code, componentType);
          }

          return code;
        }


  // Utility functions
  function generateUniqueId(prefix) {
    return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  // Move these functions before line 484 (around line 300-400)

function generateCardCode(cardType) {
  const cardClass = cardType === 'white' ? 'card-white' : `card-${cardType}`;
  
  return `
<div class="col-12">
  <div class="card ${cardClass}" contenteditable="false">
    <div class="card-body">
      <h3 class="card-title" contenteditable="false"><span contenteditable="true">CardTitle </span></h3>
    <div contenteditable="true">
      <p class="card-text">Content </p>
    </div>
    </div>
  </div>
</div>
`;
}

function generateIconCardCode(cardType) {
    const cardClass = cardType === 'white' ? 'card-white' : `card-${cardType}`;
    const iconColor = cardType === 'white' ? 'var(--bs-tertiary-dark)' : 'white';
    
    // Get the icon from the specific card type being copied
    let iconHTML = '<i class="bi bi-star-fill" style="color: ' + iconColor + ';" aria-hidden="true"></i>';
    
    // Find the preview card of the same type to get its current icon
    const previewCard = document.querySelector(`.card-${cardClass.replace('card-', '')} .icon-column i`);
    if (previewCard) {
        const iconClone = previewCard.cloneNode(true);
        iconClone.style.color = iconColor;
        iconHTML = iconClone.outerHTML;
    }
    
    return `
<div class="col-12">
  <div class="card ${cardClass} card-with-icon" contenteditable="false">
    <div class="card-body d-flex">
      <div class="icon-column">
        ${iconHTML}
      </div>
      <div class="content-column">
        <h3 class="card-title" contenteditable="false"><span contenteditable="true">CardTitle </span></h3>
      <div contenteditable="true">
        <p class="card-text">Content </p>
        </div>
      </div>
    </div>
  </div>
</div>
`;
}

function initializeCardSection() {
  const cardTypes = ['white', 'primary', 'secondary', 'tertiary'];
  
  // Regular cards
  cardTypes.forEach(cardType => {
    const htmlButton = document.querySelector(`.copy-${cardType}-card`);
    const wysiwygButton = document.querySelector(`.copy-${cardType}-card-wysiwyg`);
    
    if (htmlButton) {
      htmlButton.addEventListener("click", () => {
        const code = generateCardCode(cardType);
        universalCopy(code, false);
      });
    }
    
    if (wysiwygButton) {
      wysiwygButton.addEventListener("click", () => {
        const code = generateCardCode(cardType);
        universalCopy(code, true);
      });
    }
  });

  // Icon cards
  cardTypes.forEach(cardType => {
    const htmlButton = document.querySelector(`.copy-${cardType}-icon-card`);
    const wysiwygButton = document.querySelector(`.copy-${cardType}-icon-card-wysiwyg`);
    
    if (htmlButton) {
      htmlButton.addEventListener("click", () => {
        const code = generateIconCardCode(cardType);
        universalCopy(code, false);
      });
    }
    
    if (wysiwygButton) {
      wysiwygButton.addEventListener("click", () => {
        const code = generateIconCardCode(cardType);
        universalCopy(code, true);
      });
    }
  });

  // Add event listeners for "Change Icon" buttons on icon cards
  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('change-icon')) {
      // Check if this is an icon card button (not accordion)
      const parentCard = e.target.closest('.card-with-icon');
      if (parentCard) {
        e.preventDefault();
        e.stopPropagation();
        
        // Remove editing class from any previously selected items
        document.querySelectorAll(".card-with-icon").forEach((card) => 
          card.classList.remove("editing"));
        document.querySelectorAll(".accordion-button").forEach((button) => 
          button.classList.remove("editing"));
        
        // Mark this card as editing
        parentCard.classList.add("editing");
        currentEditTarget = "icon-card";
        currentEditingCard = parentCard;
        
        // Open the offcanvas
        const offcanvas = new bootstrap.Offcanvas(
          document.getElementById("iconSelectorOffcanvas")
        );
        offcanvas.show();
      }
    }
  });
}

  function initializeComponentSection(name, addItemCallback, generateCodeCallback) {
    document
      .querySelectorAll(`.component-section[data-name="${name}"]`)
      .forEach((section) => {
        const container = section.querySelector(".component-container");
        const contentContainer = section.querySelector(".tab-content"); // For tabs
        const minItems = 1;
        let itemCount = 0;

        // Special handling for different component types
        if (name === "Numbered Accordions") {
          itemCount = container.querySelectorAll(".accordion-item").length;
          while (itemCount < minItems) {
            addItemCallback(container, itemCount++);
          }
        } else if (name === "Flipcards") {
          const flipCardContainer = container.querySelector('.flip-cards');
          itemCount = flipCardContainer ? flipCardContainer.children.length : 0;
          if (itemCount === 0) {
            addItemCallback(container);
            itemCount = 1;
          }
        } else if (name === "Image Carousels") {
          const carouselInner = container.querySelector(".carousel-inner");
          itemCount = carouselInner.children.length;
          ensureUniqueCarouselId(container);
          while (itemCount < minItems) {
            addItemCallback(container);
            itemCount++;
          }
          initializeCarouselAria(container);
        } else if (name === "Text Carousels") {
          const carouselInner = container.querySelector(".carousel-inner");
          itemCount = carouselInner.children.length;
          ensureUniqueTextCarouselId(container);
          while (itemCount < minItems) {
            addItemCallback(container);
            itemCount++;
          }
          initializeTextCarouselAria(container);
        } else if (name === "Reveal Tables") {
          const tbody = container.querySelector("tbody");
          itemCount = tbody ? tbody.children.length : 0;
          while (itemCount < minItems) {
            addItemCallback(container);
            itemCount++;
          }
        } else if (name === "Tables") {
          // Special handling for tables - don't add regular add/remove item listeners
          const addRowBtn = section.querySelector(".add-row");
          const removeRowBtn = section.querySelector(".remove-row");
          const addColBtn = section.querySelector(".add-column");
          const removeColBtn = section.querySelector(".remove-column");
          const cycleHeaderBtn = section.querySelector(".cycle-headers");

          if (addRowBtn) addRowBtn.addEventListener("click", () => addTableRow(container));
          if (removeRowBtn) removeRowBtn.addEventListener("click", () => removeTableRow(container));
          if (addColBtn) addColBtn.addEventListener("click", () => addTableColumn(container));
          if (removeColBtn) removeColBtn.addEventListener("click", () => removeTableColumn(container));
          if (cycleHeaderBtn) cycleHeaderBtn.addEventListener("click", () => cycleTableHeaders(container));

         } else if (name === "Icon Lists") {
          const iconList = container.querySelector(".icon-list");
          itemCount = iconList ? iconList.children.length : 0;
          if (itemCount === 0) {
            addItemCallback(container);
            itemCount = 1;
          }
        } else {
          itemCount = container.children.length;
          while (itemCount < minItems) {
            addItemCallback(container, contentContainer, itemCount++);
          }
        }

        // Add item button handling
        let slideCount = 1;
        const slideCountEl = document.getElementById("slide-count");
        if (slideCountEl) slideCountEl.textContent = slideCount;
        
        let revealCount = 1;
        const revealCountEl = document.getElementById("reveal-count");
        if (revealCountEl) revealCountEl.textContent = revealCount;

        const addItemBtn = section.querySelector(".add-item");
        if (addItemBtn) {
          addItemBtn.addEventListener("click", () => {
            if (name === "Image Carousels") {
              addItemCallback(container);
              updateCarouselAria(container);
              slideCount++;
              if (slideCountEl) slideCountEl.textContent = slideCount;
            } else if (name === "Text Carousels") {
              addItemCallback(container);
              updateCarouselAria(container);
              slideCount++;
              const textSlideCountEl = document.getElementById("text-slide-count");
              if (textSlideCountEl) textSlideCountEl.textContent = slideCount;
            } else if (name === "Numbered Accordions") {
              addItemCallback(container, itemCount++);
            } else if (name === "Icon Accordions") {  // ← Add this specific case
              addItemCallback(container, itemCount++);
            } else {
              addItemCallback(container, contentContainer, itemCount++);
            }

            if (name === "Flipcards") updateFlipCardClasses(container);
            if (name === "Click and Reveal") {
              revealCount++;
              if (revealCountEl) revealCountEl.textContent = revealCount;
            }
          });
        }

        // Remove item button handling
        const removeItemBtn = section.querySelector(".remove-item");
        if (removeItemBtn) {
          removeItemBtn.addEventListener("click", () => {
            if (name === "Click and Reveal") {
              if (revealCount > 1) {
                revealCount--;
                if (revealCountEl) revealCountEl.textContent = revealCount;
              }
            }
            
            if (name === "Image Carousels") {
              const carouselInner = container.querySelector(".carousel-inner");
              if (carouselInner.children.length > minItems) {
                carouselInner.lastElementChild.remove();
                updateCarouselIndicators(container);
                updateCarouselAria(container);
                itemCount--;
                if (slideCount > 1) {
                  slideCount--;
                  if (slideCountEl) slideCountEl.textContent = slideCount;
                }
              }
            } else if (name === "Text Carousels") {
              const carouselInner = container.querySelector(".carousel-inner");
              if (carouselInner.children.length > minItems) {
                carouselInner.lastElementChild.remove();
                updateCarouselIndicators(container);
                updateCarouselAria(container);
                itemCount--;
                if (slideCount > 1) {
                  slideCount--;
                  const textSlideCountEl = document.getElementById("text-slide-count");
                  if (textSlideCountEl) textSlideCountEl.textContent = slideCount;
                }
              }
            } else if (name === "Reveal Tables") {
              const tbody = container.querySelector("tbody");
              if (tbody && tbody.children.length > minItems) {
                tbody.lastElementChild.remove();
                itemCount--;
              }
            } else if (name === "Icon Lists") {
              const ulContainer = container.querySelector("ul.icon-list");
              if (ulContainer && ulContainer.children.length > minItems) {
                ulContainer.lastElementChild.remove();
                itemCount--;
              }
            } else if (name === "Numbered Accordions") {
              if (container.children.length > minItems) {
                container.lastElementChild.remove();
                itemCount--;
              }
            } else {
              const olContainer = container.querySelector("ol");
              if (olContainer && olContainer.children.length > minItems) {
                olContainer.lastElementChild.remove();
                itemCount--;
              } else if (container.children.length > minItems) {
                container.lastElementChild.remove();
                if (contentContainer) contentContainer.lastElementChild.remove();
                itemCount--;
              }
            }
            if (name === "Flipcards") updateFlipCardClasses(container);
          });
        }


 const rowConfigs = [
    {
      htmlId: 'copyNewRowHtml',
      wysiwygId: 'copyNewRowTinyMCE',
      code: `
  <div class="row wysiwyg-mode" contenteditable="false">
<div class="deletion-guard" contenteditable="true"></div>
<div class="editable-row-content wysiwyg-mode" contenteditable="true"></div>
<div class="deletion-guard" contenteditable="true"></div>
</div>`
    },
    {
      htmlId: 'copy10RowsHtml',
      wysiwygId: 'copy10RowsTinyMCE',
      code: `
  <div class="row wysiwyg-mode" contenteditable="false">
<div class="deletion-guard" contenteditable="true"></div>
<div class="editable-row-content wysiwyg-mode" contenteditable="true"></div>
<div class="deletion-guard" contenteditable="true"></div>
</div>`.repeat(10)
    }
  ];

  rowConfigs.forEach(config => {
  const htmlBtn = document.getElementById(config.htmlId);
  const wysiwygBtn = document.getElementById(config.wysiwygId);
  
  if (htmlBtn) {
    const newHtmlBtn = htmlBtn.cloneNode(true);
    htmlBtn.parentNode.replaceChild(newHtmlBtn, htmlBtn);
    
    newHtmlBtn.addEventListener('click', () => {
      universalCopy(config.code, false, true); // skipWrapper = true
    });
  }
  
  if (wysiwygBtn) {
    const newWysiwygBtn = wysiwygBtn.cloneNode(true);
    wysiwygBtn.parentNode.replaceChild(newWysiwygBtn, wysiwygBtn);
    
    newWysiwygBtn.addEventListener('click', () => {
      universalCopy(config.code, true, true); // skipWrapper = true
    });
  }
});

document.querySelectorAll('.color-copy').forEach(btn => {
  btn.addEventListener('click', function() {
    const color = btn.getAttribute('data-color');
    // Build the row div with the corresponding color class
    const code = `<div class="row ${color} wysiwyg-mode" contenteditable="false">
  <div class="deletion-guard" contenteditable="true"></div>
  <div class="editable-row-content wysiwyg-mode" contenteditable="true"></div>
  <div class="deletion-guard" contenteditable="true"></div>
</div>`;
    // Call your universalCopy function with the HTML code and options as needed
    universalCopy(code, true, true);
  });
});


    // [Keep all your remaining functions here - icon functions, carousel functions

        section.querySelector(".copy-code").addEventListener("click", () => {
          let code;

          if (name === "Reveal Tables" || name === "Click and Reveal") {
            code = generateCodeCallback(container);
          }
          // For horizontal tabs
          else if (name === "Tabs") {
            const navContainer = container;
            const contentContainer =
              navContainer.parentElement.querySelector(".tab-content");
            if (navContainer && contentContainer) {
              code = generateTabsCode(navContainer, contentContainer);
            } else {
              console.warn(
                "Nav container or content container not found for tabs"
              );
              code = generateComponentCode(container, contentContainer, name);
            }
          }
          // For vertical tabs
          else if (name === "Vertical Tabs") {
    const navContainer = container;
    const verticalTabsContainer = container.closest(".vertical-tabs-wrapper");
    const contentContainer = verticalTabsContainer.querySelector(".tab-content");
    if (navContainer && contentContainer) {
        code = generateVerticalTabsCode(navContainer, contentContainer);
    } else {
        console.warn(
            "Nav container or content container not found for vertical tabs"
        );
        code = generateComponentCode(container, contentContainer, name);
    }
}
 else if (name === "Image Carousels") {
            code = generateCarouselCode(container);
          } else if (name === "Text Carousels") {
            code = generateTextCarouselCode(container);
          } else if (name === "Accordions") {
            code = generateAccordionCode(container);
          } else if (name === "Numbered Accordions") {
            code = generateNumberedAccordionCode(container);
          } else if (name === "Icon Accordions") {
            code = generateIconAccordionCode(container);
          } else if (name === "Flipcards") {
            code = generateFlipCardCode(container);
          } else {
            code = generateComponentCode(container, contentContainer, name);
          }

          console.log("Copied code:", code); // Add this line
          navigator.clipboard
            .writeText(code)
            .then(() => showToast("HTML Copied", "success"))
            .catch((err) => {
              console.error("Copy failed:", err);
              showToast("Failed to copy HTML", 'error');
            });
          console.log("Generated code:", code); // Keep your debug line
        });

        // WYSIWYG copy button - using full copyForD2LTinyMCE function
        section
          .querySelector(".copy-wysiwyg")
          ?.addEventListener("click", () => {
            let code;
            if (name === "Reveal Tables" || name === "Click and Reveal") {
              code = generateCodeCallback(container);
            }
            // For horizontal tabs
            else if (name === "Tabs") {
              const navContainer = container;
              const contentContainer =
                navContainer.parentElement.querySelector(".tab-content");
              if (navContainer && contentContainer) {
                code = generateTabsCode(navContainer, contentContainer);
              } else {
                console.warn(
                  "Nav container or content container not found for tabs"
                );
                code = generateComponentCode(container, contentContainer, name);
              }
            }
            // For vertical tabs
            else if (name === "Vertical Tabs") {
    const navContainer = container;
    const verticalTabsContainer = container.closest(".vertical-tabs-wrapper");
    const contentContainer = verticalTabsContainer.querySelector(".tab-content");
    if (navContainer && contentContainer) {
        code = generateVerticalTabsCode(navContainer, contentContainer);
    } else {
        console.warn(
            "Nav container or content container not found for vertical tabs"
        );
        code = generateComponentCode(container, contentContainer, name);
    }
}
 else if (name === "Image Carousels") {
              code = generateCarouselCode(container);
            } else if (name === "Text Carousels") {
              code = generateTextCarouselCode(container);
            } else if (name === "Accordions") {
              code = generateAccordionCode(container);
            } else if (name === "Numbered Accordions") {
              code = generateNumberedAccordionCode(container);
            } else if (name === "Icon Accordions") {
              code = generateIconAccordionCode(container);
            } else if (name === "Flipcards") {
              code = generateFlipCardCode(container);
            } else {
              code = generateComponentCode(container, contentContainer, name);
            }
            console.log("Copied WYSIWYG:", code); // Add this line
            copyForD2LTinyMCE(code).catch((err) => {
              console.error("All copy methods failed:", err);
              // Last resort - copy as plain HTML
              navigator.clipboard
                .writeText(code)
                .then(() =>
                  showToast("Copied as plain HTML code - paste in HTML view", 'error')
                );
            });
          });
      });
  }

  
function updateCarouselIds(htmlString) {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = htmlString;

  // Generate a unique carousel ID
  const newCarouselId = generateUniqueId("carousel");

  // Update the main carousel ID
  const carousel = tempDiv.querySelector(".carousel");
  if (carousel) {
    carousel.id = newCarouselId;
  }

  // Update ALL controls that reference this carousel (more comprehensive)
  const controls = tempDiv.querySelectorAll("[data-bs-target]");
  controls.forEach((control) => {
    const target = control.getAttribute("data-bs-target");
    // Update any carousel-related targets
    if (target && (target.includes("carousel") || target.startsWith("#"))) {
      control.setAttribute("data-bs-target", `#${newCarouselId}`);
    }
  });

  // Update slide IDs and ARIA attributes
  const slides = tempDiv.querySelectorAll(".carousel-item");
  slides.forEach((slide, index) => {
    const newSlideId = `${newCarouselId}-item-${index}`;
    slide.id = newSlideId;
    slide.setAttribute("aria-label", `${index + 1} of ${slides.length}`);
  });

  // Update any aria-labelledby attributes
  const ariaElements = tempDiv.querySelectorAll("[aria-labelledby]");
  ariaElements.forEach((el) => {
    const value = el.getAttribute("aria-labelledby");
    if (value && value.includes("carousel")) {
      el.setAttribute("aria-labelledby", newCarouselId);
    }
  });

  // Update any aria-controls attributes (indicator buttons reference a slide ID)
  const ariaControls = tempDiv.querySelectorAll("[aria-controls]");
  ariaControls.forEach((el) => {
    const value = el.getAttribute("aria-controls");
    if (value && value.includes("carousel")) {
      const slideIndex = el.getAttribute("data-bs-slide-to") || "0";
      el.setAttribute("aria-controls", `${newCarouselId}-item-${slideIndex}`);
    }
  });

  return tempDiv.innerHTML;
}


  // Add this function for accordions which have a specific ID pattern
  function updateAccordionIds(htmlString) {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlString;

    // Get the accordion
    const accordion = tempDiv.querySelector(".accordion");
    if (accordion) {
      const newAccordionId = generateUniqueId("accordion");
      accordion.id = newAccordionId;

      // Update all accordion items
      const items = tempDiv.querySelectorAll(".accordion-item");
      items.forEach((item, index) => {
        const header = item.querySelector(".accordion-header");
        const collapse = item.querySelector(".accordion-collapse");

        if (header && collapse) {
          const newHeaderId = `${newAccordionId}-header-${index}`;
          const newCollapseId = `${newAccordionId}-collapse-${index}`;

          header.id = newHeaderId;
          collapse.id = newCollapseId;

          // Update button attributes
          const button = header.querySelector("button");
          if (button) {
            button.setAttribute("data-bs-target", `#${newCollapseId}`);
            button.setAttribute("aria-controls", newCollapseId);
          }

          // Update collapse attributes
          collapse.setAttribute("aria-labelledby", newHeaderId);
        }
      });
    }

    return tempDiv.innerHTML;
  }

  // Flipcard Functions
  function updateFlipCardClasses(container) {
    // Get all card wrappers
    const cards = container.querySelectorAll(".flip-card-wrapper");
    const cardCount = cards.length;

    // Determine the appropriate column classes based on card count
    let columnClass = "";
    switch (cardCount) {
      case 1:
        columnClass = "col-6 mx-auto";
        break;
      case 2:
        columnClass = "col-12 col-sm-6";
        break;
      case 3:
        columnClass = "col-12 col-md-4";
        break;
      case 4:
      default:
        columnClass = "col-12 col-sm-6 col-lg-3";
        break;
    }

    // Apply the column class to all cards
    cards.forEach((card) => {
      card.className = `flip-card-wrapper ${columnClass} mb-3`;
    });
  }

  function addFlipCard(container) {
  const cardIndex = container.children.length;

  const card = document.createElement("div");
  card.className = "flip-card-wrapper mb-3";
  card.innerHTML = `
    <div class="flip-card-container">
      <div class="flip-card mx-auto my-3 show" aria-labelledby="flip-card-title-${cardIndex}">
        <div class="flip-card-inner" aria-label="Flip card" tabindex="0">
          <div class="flip-card-front">
            <div class="flip-card-front-content">
              <h3 id="flip-card-title-${cardIndex}" contenteditable="false"><span contenteditable="true">FrontTitle${cardIndex} </span></h3>
            </div>
          </div>
          <div class="flip-card-back">
            <div class="flip-card-back-content">
              <div class="flip-card-header-primary">
                <h3 contenteditable="false"><span contenteditable="true">BackTitle${cardIndex} </span></h3>
              </div>
              <div class="flip-card-back-body">
              <div contenteditable="true">
                <p>ContentforCard${cardIndex} </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  container.appendChild(card);
  updateFlipCardClasses(container);
}


  function generateFlipCardCode(container) {
    // Clone the container to avoid modifying the actual DOM
    const containerClone = container.cloneNode(true);
    stripRuntimeArtifacts(containerClone);
    // Normalize contenteditable on the body text wrapper, even stale/first items.
    // Titles are excluded on purpose: the h3 stays contenteditable="false" with
    // an inner <span contenteditable="true"> so deleting the title text can't
    // eat the heading tag itself.
    containerClone.querySelectorAll('.flip-card-back-body > div').forEach(el => {
      el.setAttribute('contenteditable', 'true');
    });
    // Force "show" so both faces stack and stay visible for editing — without it
    // .flip-card-inner reverts to the 3D grid layout that only displays the front.
    containerClone.querySelectorAll('.flip-card').forEach(el => el.classList.add('show'));
    // Update classes in the cloned container
    const cards = containerClone.querySelectorAll('.flip-card-wrapper');
    const cardCount = cards.length;

    // Determine column classes (same logic as updateFlipCardClasses)
    let columnClass = "";
    switch (cardCount) {
      case 1:
        columnClass = "col-6 mx-auto";
        break;
      case 2:
        columnClass = "col-12 col-sm-6";
        break;
      case 3:
        columnClass = "col-12 col-md-4";
        break;
      case 4:
      default:
        columnClass = "col-12 col-sm-6 col-lg-3";
        break;
    }

    // Apply column classes to the cloned elements
    cards.forEach((card) => {
      card.className = columnClass;
    });

    // Return the HTML with proper column classes
    return `
<div class="flip-cards" contenteditable="false">${containerClone.innerHTML}
</div>

  
  

`;
  }

  // Accordion Functions
  function addAccordionItem(container) {
    const accordionCount = container.children.length + 1;
    const parentId = container.id || generateUniqueId('accordion');
    container.id = parentId; // Ensure container has the ID
    const uniqueId = `${parentId}-item-${accordionCount}`;
    const newItem = document.createElement("div");
    newItem.className = "accordion-item";
    newItem.innerHTML = `
    <div class="accordion-header" role="heading" aria-level="3">
    <div class="deletion-guard" contenteditable="true"></div>
<h3>
  <button class="accordion-button collapsed" type="button"
          data-bs-toggle="collapse"
          data-bs-target="#${uniqueId}"
          aria-expanded="false"
          aria-controls="${uniqueId}"
          contenteditable="false">
    <span contenteditable="true">AccordionItem#${accordionCount} </span>
  </button>
</h3>
</div>
<div id="${uniqueId}" class="accordion-collapse collapse show">
<div class="deletion-guard" contenteditable="true"></div>
  <div class="accordion-body">
  <div contenteditable="false"><div contenteditable="true">
    <p>ParagraphforAccordionItem#${accordionCount} </p>
    </div>
  </div></div>
</div>
`;
    container.appendChild(newItem);
  }


  // Tab Functions
  function addTabItem(navContainer, contentContainer, tabIndex) {
  const parentId = navContainer.id || generateUniqueId('tabs');
  navContainer.id = parentId;
  const uniqueId = `${parentId}-tab-${tabIndex}`;
  const contentId = `${parentId}-content-${tabIndex}`;

  // CREATE the nav item element first
  const newTabNavItem = document.createElement("li");
  newTabNavItem.className = "nav-item";
  newTabNavItem.setAttribute("role", "presentation");

  // THEN set its innerHTML
  newTabNavItem.innerHTML = `<span class="deletion-guard" contenteditable="true"></span>
    <a class='nav-link ${tabIndex === 0 ? "active" : ""}' 
       id='${uniqueId}' 
       data-bs-toggle='tab' 
       href='#${contentId}' 
       role='tab' 
       aria-controls='${contentId}' 
       aria-selected='${tabIndex === 0}'>
      <span contenteditable="true">Tab${tabIndex + 1} </span>
    </a><span class="deletion-guard" contenteditable="true"></span>`;

  navContainer.appendChild(newTabNavItem);

  // Add Tab Content Item
  if (contentContainer) {
    const newTabContent = document.createElement("div");
    newTabContent.className = `tab-pane ${tabIndex === 0 ? "active" : ""}`;
    newTabContent.id = contentId;
    newTabContent.setAttribute("role", "tabpanel");
    newTabContent.setAttribute("aria-labelledby", uniqueId);

    newTabContent.innerHTML = `
<h3 contenteditable="false"><span contenteditable="true">HeaderforTab${tabIndex + 1} </span></h3>
<div contenteditable="true">
<p>ContentforTab${tabIndex + 1} </p>
</div>
`;
    
    contentContainer.appendChild(newTabContent);
  }
}


  function generateTabsCode(navContainer, contentContainer) {
  if (!navContainer) return "<!-- Nav container not found -->";

  const newTabsId = generateUniqueId("tabs");
  const navClone = navContainer.cloneNode(true);
  const contentClone = contentContainer.cloneNode(true);

  [...navClone.children].forEach((navItem, index) => {
    const link = navItem.querySelector('.nav-link');
    if (!link) return;
    
    const newTabId = `${newTabsId}-tab-${index}`;
    const newContentId = `${newTabsId}-content-${index}`;
    
    // Create button instead of anchor
    const button = document.createElement('button');
    button.className = `nav-link ${index === 0 ? 'active' : ''}`;
    button.id = newTabId;
    button.setAttribute('data-bs-toggle', 'tab');
    button.setAttribute('data-bs-target', `#${newContentId}`);
    button.setAttribute('role', 'tab');
    button.setAttribute('aria-controls', newContentId);
    button.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
    button.setAttribute('type', 'button');
    button.setAttribute('contenteditable', 'false');
    button.innerHTML = `<span class="deletion-guard" contenteditable="true">&nbsp;</span><span contenteditable="true">Tab${index + 1} </span><span class="deletion-guard" contenteditable="true">&nbsp;</span>`;
    
    // Replace the anchor with button
    navItem.replaceChild(button, link);
    
         // Update corresponding content pane
    if (contentClone.children[index]) {
      const contentPane = contentClone.children[index];
      contentPane.id = newContentId;
      contentPane.setAttribute('aria-labelledby', newTabId);
      contentPane.className = 'tab-pane' + (index === 0 ? ' active' : '');
      contentPane.querySelectorAll('div, h3, p').forEach(el => {
        if (el.hasAttribute('contenteditable')) el.setAttribute('contenteditable', 'true');
      });
    }
  });

  return `<div class="col-12">
  <ul class="nav nav-tabs nav-fill horizontal-tabs wysiwyg-mode" id="${newTabsId}-nav" role="tablist" contenteditable="false">
    ${navClone.innerHTML.trim()}
  </ul>
  <div class='tab-content border border-1 p-3 wysiwyg-mode' id="${newTabsId}-content" contenteditable="false">
    ${contentClone.innerHTML.trim()}
  </div>
</div>
`;
}



  // Vertical Tabs Functions
  function addVerticalTabItem(navContainer, contentContainer, tabIndex) {
    // Ensure the parent container has a unique ID
    const parentId = navContainer.closest(".vertical-tabs-wrapper")?.id || 
                    `vertical-tabs-${Date.now()}`;
    navContainer.closest(".vertical-tabs-wrapper").id = parentId;

    // Generate unique IDs
    const uniqueId = `vtab-${tabIndex + 1}`;
    const tabId = `${uniqueId}-tab`;
    const contentId = `${uniqueId}-content`;

    // Create li element with proper nav-item class
    const newTabNavLi = document.createElement("li");
    newTabNavLi.className = "nav-item";
    newTabNavLi.setAttribute("role", "presentation");

    // Create button element inside li
    const newTabNavButton = document.createElement("button");
    newTabNavButton.className = `nav-link ${tabIndex === 0 ? "active" : ""}`;
    newTabNavButton.id = tabId;
    newTabNavButton.setAttribute("data-bs-toggle", "tab");
    newTabNavButton.setAttribute("data-bs-target", `#${contentId}`);
    newTabNavButton.setAttribute("role", "tab");
    newTabNavButton.setAttribute("aria-controls", contentId);
    newTabNavButton.setAttribute("aria-selected", tabIndex === 0 ? "true" : "false");
    newTabNavButton.setAttribute("type", "button");
    
    // Create the span with contenteditable="true"
    const editableSpan = document.createElement("span");
    editableSpan.setAttribute("contenteditable", "true");
    editableSpan.textContent = `Tab${tabIndex + 1}`;

    const deletionGuard = document.createElement("span");
    deletionGuard.className = "deletion-guard";
    deletionGuard.setAttribute("contenteditable", "true");
    
    newTabNavButton.innerHTML = `<span class="deletion-guard" contenteditable="true"></span>`;
    newTabNavButton.appendChild(editableSpan);
    newTabNavButton.appendChild(deletionGuard);
    newTabNavLi.appendChild(newTabNavButton);
    navContainer.appendChild(newTabNavLi);

    // Add Tab Content Item
    if (contentContainer) {
        const newTabContent = document.createElement("div");
        newTabContent.className = `tab-pane ${tabIndex === 0 ? "show active" : ""}`;
        newTabContent.id = contentId;
        newTabContent.setAttribute("role", "tabpanel");
        newTabContent.setAttribute("aria-labelledby", tabId);

        newTabContent.innerHTML = `
        <div class="deletion-guard" contenteditable="true"></div>
        <h3 contenteditable="false"><span contenteditable="true">HeaderforTab${tabIndex + 1} </span></h3>
        <div contenteditable="true">
        <p>ContentforTab${tabIndex + 1} </p>
        </div>
        <div class="deletion-guard" contenteditable="true"></div>`;

        contentContainer.appendChild(newTabContent);
    }
}

function generateVerticalTabsCode(navContainer, contentContainer) {
    if (!navContainer) return "<!-- Nav container not found -->";
    
    const verticalTabsContainer = navContainer.closest(".vertical-tabs-wrapper");
    if (!verticalTabsContainer) return "<!-- Vertical tabs container not found -->";

    // Generate a unique ID for the vertical tabs
    const newVerticalTabsId = generateUniqueId("vertical-tabs");
    
    // Clone containers to avoid modifying originals
    const navClone = navContainer.cloneNode(true);
    const contentClone = contentContainer.cloneNode(true);

    // Update all tab buttons and content panes with unique IDs
    [...navClone.children].forEach((navLi, index) => {
    const navButton = navLi.querySelector('button');
    if (navButton) {
      const newTabId = `vtab-${index + 1}-tab`;
      const newContentId = `vtab-${index + 1}-content`;

      navButton.id = newTabId;
      navButton.setAttribute('data-bs-target', `#${newContentId}`);
      navButton.setAttribute('aria-controls', newContentId);
      navButton.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
      navButton.className = `nav-link ${index === 0 ? 'active' : ''}`;
      // Normalize contenteditable on the tab label, even stale/first tabs
      // the runtime cleanup already locked down.
      navButton.querySelectorAll('span').forEach(el => el.setAttribute('contenteditable', 'true'));

      // Update corresponding content pane
      if (contentClone.children[index]) {
        const contentPane = contentClone.children[index];
        contentPane.id = newContentId;
        contentPane.setAttribute('aria-labelledby', newTabId);
        contentPane.className = 'tab-pane' + (index === 0 ? ' show active' : '');
        contentPane.querySelectorAll('div:not(.deletion-guard), h3, p').forEach(el => {
          if (el.hasAttribute('contenteditable')) el.setAttribute('contenteditable', 'true');
        });
      }
    } // closes if (navButton)
  }); // closes forEach

  return `<div class="vertical-tabs-wrapper" contenteditable="false">
      <!-- Navigation -->
      <ul class="nav nav-tabs d-flex flex-row flex-md-column" id="vertical-tabs-nav" role="tablist">
        ${navClone.innerHTML.trim()}
      </ul>
      <!-- Content Panels -->
      <div class="tab-content">
        ${contentClone.innerHTML.trim()}
      </div>
    </div>`;
}


  function addNumberedAccordionItem(container, index) {
    console.log("Adding numbered accordion item at index:", index);
    const parentId = container.id || `numberedAccordion-${Date.now()}`;
    container.id = parentId;

    const uniqueId = `${parentId}-item-${index}`;

    const newItem = document.createElement("div");
    newItem.className = "accordion-item";
    newItem.innerHTML = `
    <div class="deletion-guard" contenteditable="true"></div>
    <h3 class="accordion-header" role="heading" aria-level="3">
      <button
        class="accordion-button collapsed"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#${uniqueId}"
        aria-expanded="false"
        aria-controls="${uniqueId}"
        contenteditable="false">
        <span contenteditable="true">
        AccordionItem#${index + 1} </span>
      </button>
    </h3>
    <div id="${uniqueId}" class="accordion-collapse collapse show">
    <div class="deletion-guard" contenteditable="true"></div>
      <div class="accordion-body">
      <div contenteditable="false"><div contenteditable="true">
        <p>ContentAccordionItem#${index + 1} </p>
        </div></div>
      </div>
    </div>
  `;

    container.appendChild(newItem);
  }

function addIconAccordionItem(container, index) {
  console.log("Adding icon accordion item at index:", index);
    // Ensure the container has a unique ID
    const parentId = container.id || `iconAccordion-${Date.now()}`;
    container.id = parentId;
    
    // Generate IDs that match your existing pattern
    const collapseId = `${parentId}-collapse-${index}`;
    const headerId = `${parentId}-header-${index}`;
    
    // Create a new accordion item
    const newItem = document.createElement("div");
    newItem.className = "accordion-item";
    
    newItem.innerHTML = `
    <div class="deletion-guard" contenteditable="true"></div>
        <h3 class="accordion-header" role="heading" aria-level="3" id="${headerId}">
            <button class="accordion-button collapsed d-flex align-items-center gap-2 icon-header" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#${collapseId}" 
                    aria-expanded="false" 
                    aria-controls="${collapseId}"
                    contenteditable="false">
                <i class="bi bi-star-fill icon"></i> 
                <span contenteditable="true">AccordionItem#${index + 1} </span>
                <span class="ms-auto">
                    <button class="btn btn-sm btn-outline-primary change-icon" type="button">Change Icon</button>
                </span>
            </button>
        </h3>
        <div id="${collapseId}" class="accordion-collapse collapse show" aria-labelledby="${headerId}">
        <div class="deletion-guard" contenteditable="true"></div>
            <div class="accordion-body">
                <div contenteditable="false"><div contenteditable="true">
                    <p>ContentAccordionItem#${index + 1} </p>
                </div></div>
            </div>
        </div>
    `;
    
    // Append the new item to the accordion container
    container.appendChild(newItem);
    
    // Add event listener for the "Change Icon" button
    const changeIconBtn = newItem.querySelector(".change-icon");
    if (changeIconBtn) {
        changeIconBtn.addEventListener("click", function (e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Remove editing class from any previously selected item
            document
                .querySelectorAll(".accordion-button")
                .forEach((button) => button.classList.remove("editing"));
            
            // Add editing class to this item
            const accordionHeader = this.closest(".accordion-header");
            if (accordionHeader) {
                const accordionButton = accordionHeader.querySelector(".accordion-button");
                if (accordionButton) {
                    accordionButton.classList.add("editing");
                    currentEditTarget = "accordion";
                    toggleColorSelector(false);
                    
                    // Open the offcanvas
                    const offcanvas = new bootstrap.Offcanvas(
                        document.getElementById("iconSelectorOffcanvas")
                    );
                    offcanvas.show();
                }
            }
        });
    }
}



    function generateAccordionCode(container) {
  // Clone the container to avoid modifying the original
  const containerClone = container.cloneNode(true);
  stripRuntimeArtifacts(containerClone);
  // Normalize contenteditable on span labels and body paragraphs
  containerClone.querySelectorAll('.accordion-button span, .accordion-body div[contenteditable]:not([contenteditable="false"]), .accordion-body p').forEach(el => {
    if (el.matches('span') || el.tagName === 'P') el.setAttribute('contenteditable', 'true');
  });
  containerClone.querySelectorAll('.accordion-body > div > div').forEach(el => el.setAttribute('contenteditable', 'true'));
  // Generate a unique accordion ID
  const newAccordionId = generateUniqueId('accordion');
  
  // Update all accordion items with unique IDs
  containerClone.querySelectorAll(".accordion-item").forEach((item, index) => {
    const header = item.querySelector(".accordion-header");
    const collapse = item.querySelector(".accordion-collapse");
    const button = item.querySelector(".accordion-button");
    
    if (header && collapse && button) {
      const newHeaderId = `${newAccordionId}-header-${index}`;
      const newCollapseId = `${newAccordionId}-collapse-${index}`;
      
      header.id = newHeaderId;
      collapse.id = newCollapseId;
      
      // Update button attributes
      button.setAttribute("data-bs-target", `#${newCollapseId}`);
      button.setAttribute("aria-controls", newCollapseId);
      button.setAttribute("aria-expanded", "true");
      button.classList.remove("collapsed");

      // Update collapse attributes and ensure it's expanded
      collapse.setAttribute("aria-labelledby", newHeaderId);
      collapse.classList.add("show");
    }
  });

  const isSingleItem = containerClone.querySelectorAll(".accordion-item").length === 1;
  const openAllButton = isSingleItem ? "" : `
  <div class="d-flex justify-content-end" contenteditable="false">
    <button class="btn btn-secondary mb-3 accordion-toggle-button" data-accordion-id="${newAccordionId}">Open All</button>
  </div>`;

  return `
<div class="col-12">${openAllButton}
  <div class="accordion" id="${newAccordionId}">
    ${containerClone.innerHTML.trim()}
  </div>
</div>
`;
}

function generateNumberedAccordionCode(container) {
  const containerClone = container.cloneNode(true);
  stripRuntimeArtifacts(containerClone);
  containerClone.querySelectorAll('.accordion-button span').forEach(el => el.setAttribute('contenteditable', 'true'));
  containerClone.querySelectorAll('.accordion-body > div > div').forEach(el => el.setAttribute('contenteditable', 'true'));
  const newAccordionId = generateUniqueId('numbered-accordion');
  
  // Update all accordion items with unique IDs
  containerClone.querySelectorAll(".accordion-item").forEach((item, index) => {
    const header = item.querySelector(".accordion-header");
    const collapse = item.querySelector(".accordion-collapse");
    const button = item.querySelector(".accordion-button");
    
    if (header && collapse && button) {
      const newHeaderId = `${newAccordionId}-header-${index}`;
      const newCollapseId = `${newAccordionId}-collapse-${index}`;
      
      header.id = newHeaderId;
      collapse.id = newCollapseId;
      button.setAttribute("data-bs-target", `#${newCollapseId}`);
      button.setAttribute("aria-controls", newCollapseId);
      button.setAttribute("aria-expanded", "true");
      button.classList.remove("collapsed");

      // Update collapse attributes and ensure it's expanded
      collapse.setAttribute("aria-labelledby", newHeaderId);
      collapse.classList.add("show");
    }
  });

  const isSingleItem = containerClone.querySelectorAll(".accordion-item").length === 1;
  const openAllButton = isSingleItem ? "" : `
  <div class="d-flex justify-content-end" contenteditable="false">
    <button class="btn btn-secondary mb-3 accordion-toggle-button" data-accordion-id="${newAccordionId}">Open All</button>
  </div>`;

  return `
<div class="col-12">${openAllButton}
  <div class="accordion numbered-accordion" id="${newAccordionId}">
    ${containerClone.innerHTML.trim()}
  </div>
</div>
`;
}
function generateIconAccordionCode(container) {
  // Clone the container to avoid modifying the original DOM
  const containerClone = container.cloneNode(true);
  stripRuntimeArtifacts(containerClone);
  containerClone.querySelectorAll('.accordion-button span').forEach(el => el.setAttribute('contenteditable', 'true'));
  containerClone.querySelectorAll('.accordion-body > div > div').forEach(el => el.setAttribute('contenteditable', 'true'));
  // Generate a unique accordion ID
  const newAccordionId = generateUniqueId('icon-accordion');
  
  // Update all accordion items with unique IDs
  containerClone.querySelectorAll(".accordion-item").forEach((item, index) => {
    const header = item.querySelector(".accordion-header");
    const collapse = item.querySelector(".accordion-collapse");
    const button = item.querySelector(".accordion-button");
    
    if (header && collapse && button) {
      const newHeaderId = `${newAccordionId}-header-${index}`;
      const newCollapseId = `${newAccordionId}-collapse-${index}`;
      
      header.id = newHeaderId;
      collapse.id = newCollapseId;
      
      // Update button attributes
      button.setAttribute("data-bs-target", `#${newCollapseId}`);
      button.setAttribute("aria-controls", newCollapseId);
      button.setAttribute("aria-expanded", "true");
      button.classList.remove("collapsed");

      // Update collapse attributes and ensure it's expanded
      collapse.setAttribute("aria-labelledby", newHeaderId);
      collapse.classList.add("show");
    }
  });

  // Clean up the cloned container
  containerClone.querySelectorAll(".change-icon").forEach((button) => {
    button.remove();
  });
  // Remove the now-empty wrapper the Change Icon button lived in — it still
  // holds whitespace text nodes so `span:empty` below never catches it, and
  // left behind it renders as a stray editable block eating half the header.
  containerClone.querySelectorAll(".accordion-button .ms-auto").forEach((span) => {
    span.remove();
  });
  containerClone
    .querySelectorAll(".accordion-button.editing")
    .forEach((button) => button.classList.remove("editing"));
  containerClone.querySelectorAll("span:empty").forEach((span) => {
    span.remove();
  });

  const isSingleItem = containerClone.querySelectorAll(".accordion-item").length === 1;
  const openAllButton = isSingleItem ? "" : `
<div class="d-flex justify-content-end" contenteditable="false">
  <button class="btn btn-secondary mb-3 accordion-toggle-button" data-accordion-id="${newAccordionId}">Open All</button>
</div>`;

  return `
<div class="col-12">${openAllButton}
  <div class="accordion" id="${newAccordionId}">${containerClone.innerHTML.trim()}</div>
</div>
`;
}

function generateTranscriptIconAccordionCode(container) {
  const containerClone = container.cloneNode(true);
  stripRuntimeArtifacts(containerClone);
  const newAccordionId = generateUniqueId("icon-accordion");

  // Normalize contenteditable so the transcript item is editable even when
  // it's the stale/first accordion item the runtime cleanup already locked down.
  containerClone.querySelectorAll('.accordion-button span').forEach(el => el.setAttribute('contenteditable', 'true'));
  containerClone.querySelectorAll('.accordion-body > div > div').forEach(el => el.setAttribute('contenteditable', 'true'));

  // Remove ALL "Change Icon" buttons from the entire clone
  containerClone.querySelectorAll('.change-icon').forEach(btn => btn.remove());
  // Remove the now-empty wrapper the Change Icon button lived in — left
  // behind it renders as a stray editable block eating half the header.
  containerClone.querySelectorAll('.accordion-button .ms-auto').forEach(span => span.remove());

  // Assume one accordion item for transcript accordion
  const item = containerClone.querySelector(".accordion-item");
  if (item) {
    const header = item.querySelector(".accordion-header");
    const collapse = item.querySelector(".accordion-collapse");
    const button = item.querySelector(".accordion-button");

    const newHeaderId = `${newAccordionId}-header-0`;
    const newCollapseId = `${newAccordionId}-collapse-0`;

    // Set IDs and attributes for a11y and Bootstrap
    header.id = newHeaderId;
    collapse.id = newCollapseId;
    collapse.setAttribute("aria-labelledby", newHeaderId);
    collapse.classList.add("show");
    button.setAttribute("data-bs-target", `#${newCollapseId}`);
    button.setAttribute("aria-controls", newCollapseId);
    button.setAttribute("aria-expanded", "true");
    button.classList.remove("collapsed");

    // Remove any existing icon and force bi-card-text
    const existingIcon = button.querySelector('.bi');
    if (existingIcon) existingIcon.remove();
    button.insertAdjacentHTML("afterbegin", '<i class="bi bi-card-text"></i> ');
  }

  // Output structure, matching Bootstrap and your needs
  return `
<div class="col-12">
  <div class="accordion transcript" id="${newAccordionId}">
    ${containerClone.innerHTML.trim()}
  </div>
</div>
  `.trim();
}


  function addIconListItem(container) {
    // Find the ul element inside the container
    const ul = container.querySelector("ul.icon-list");

    const item = document.createElement("li");
    item.innerHTML = `
  

    <i class="bi bi-check-circle-fill" aria-hidden="true" contenteditable="false"></i>Item 
    <div class="item-actions">
      <button class="btn btn-sm btn-outline-primary change-icon">Change Icon</button>
    </div>

    
  `;

    // Append to the ul element, not the container
    ul.appendChild(item);

    // Change icon button functionality to use offcanvas
    item.querySelector(".change-icon").addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();

      // Remove editing class from any previously selected item
      document
        .querySelectorAll("li")
        .forEach((li) => li.classList.remove("editing"));

      // Mark this item as being edited
      item.classList.add("editing");
      currentEditTarget = "list";

      // Open the offcanvas
      const offcanvas = new bootstrap.Offcanvas(
        document.getElementById("iconSelectorOffcanvas")
      );
      offcanvas.show();
    });

    return item;
  }

  function generateIconListCode(container) {
    // Get the ul element
    const ul = container.querySelector("ul.icon-list");

    if (!ul) {
      console.error("No icon list found in container");
      return "";
    }

    // Get all list items
    const listItems = ul.querySelectorAll("li");

    // Build clean list items
    let cleanItems = [];

    listItems.forEach((li) => {
      // Find the icon
      const icon = li.querySelector("i");
      const iconHTML = icon
        ? icon.outerHTML
        : '<i class="bi bi-check-circle-fill" aria-hidden="true" contenteditable="false"></i>';

      // Get the text content by creating a temporary element
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = li.innerHTML;

      // Remove the item-actions div and comments
      tempDiv.querySelectorAll(".item-actions").forEach((el) => el.remove());
      const tempHTML = tempDiv.innerHTML
        .replace(/<!--[\s\S]*?-->/g, "") // Remove HTML comments
        .replace(/<i[^>]*><\/i>/, "") // Remove the icon (we'll add it back)
        .trim();

      // Extract just the text
      const tempDiv2 = document.createElement("div");
      tempDiv2.innerHTML = tempHTML;
      const text = tempDiv2.textContent.trim();

         // Add clean item to array (fixed typo: content-editable -> contenteditable)
    cleanItems.push(`<li>${iconHTML}${text} </li>`);
    });

    // Join items with newlines
    const itemsHTML = cleanItems.join("\n");

    // Return the complete HTML
    return `
<div class="col-12">
<div contenteditable="false">
<ul class="icon-list" contenteditable="true">
${itemsHTML}
</ul>
</div>
</div>
`;
  }

  function initializeCarouselAria(container) {
    const carousel = container.querySelector(".carousel");
    const carouselId = carousel.id;
    const carouselInner = carousel.querySelector(".carousel-inner");

    // Set ARIA on main carousel element
    carousel.setAttribute("aria-roledescription", "carousel");
    carousel.setAttribute("aria-label", "Image carousel");
    carousel.setAttribute("contenteditable", "false");
    carousel.classList.add("carousel", "slide", "wysiwyg-mode");

    // Set ARIA on controls
    const prevButton = carousel.querySelector(".carousel-control-prev");
    const nextButton = carousel.querySelector(".carousel-control-next");

    if (prevButton) {
      prevButton.setAttribute("aria-label", "Previous slide");
    }

    if (nextButton) {
      nextButton.setAttribute("aria-label", "Next slide");
    }

    // Update slides with proper ARIA
    updateCarouselSlidesAria(container);
  }

  function updateCarouselAria(container) {
    // This function updates ARIA attributes after slides are added/removed
    updateCarouselSlidesAria(container);
    updateCarouselIndicators(container);
  }

  function updateCarouselSlidesAria(container) {
    const carousel = container.querySelector(".carousel");
    const carouselId = carousel.id;
    const carouselInner = carousel.querySelector(".carousel-inner");
    const slides = carouselInner.querySelectorAll(".carousel-item");
    const slideCount = slides.length;

    // Update ARIA for each slide
    slides.forEach((slide, index) => {
      const slideId = `${carouselId}-item-${index}`;
      slide.id = slideId;
      slide.setAttribute("role", "tabpanel");
      slide.setAttribute("aria-roledescription", "slide");
      slide.setAttribute("aria-label", `${index + 1} of ${slideCount}`);
    });
  }

  // Update your existing updateCarouselIndicators function
  function updateCarouselIndicators(container) {
    const carousel = container.querySelector(".carousel");
    const carouselId = carousel.id;
    const carouselInner = carousel.querySelector(".carousel-inner");
    const slides = carouselInner.querySelectorAll(".carousel-item");

    let indicators = carousel.querySelector(".carousel-indicators");

    if (!indicators) {
      indicators = document.createElement("div");
      indicators.className = "carousel-indicators";
      indicators.setAttribute("role", "tablist");
      carousel.querySelector(".carousel-inner").before(indicators);
    } else {
      indicators.innerHTML = "";
      indicators.setAttribute("role", "tablist");
    }

    slides.forEach((slide, index) => {
      const slideId = slide.id || `${carouselId}-item-${index}`;

      // Ensure slide has proper ID
      slide.id = slideId;

      const button = document.createElement("button");
      button.type = "button";
      button.setAttribute("data-bs-target", "#" + carouselId);
      button.setAttribute("data-bs-slide-to", index);
      button.setAttribute("role", "tab");
      button.setAttribute("aria-controls", slideId);

      if (slide.classList.contains("active")) {
        button.className = "active";
        button.setAttribute("aria-selected", "true");
        button.setAttribute("aria-current", "true");
      } else {
        button.setAttribute("aria-selected", "false");
      }

      button.setAttribute("aria-label", `Slide ${index + 1}`);
      indicators.appendChild(button);
    });
  }

  // Modify your addCarouselSlide function
  function addCarouselSlide(container) {
    const carousel = container.querySelector(".carousel");
    const carouselInner = carousel.querySelector(".carousel-inner");
    const slideIndex = carouselInner.children.length;
    const carouselId = ensureUniqueCarouselId(container);

    const slide = document.createElement("div");
    slide.className = "carousel-item" + (slideIndex === 0 ? " active" : "");
    slide.id = `${carouselId}-item-${slideIndex}`;
    slide.setAttribute("role", "tabpanel");
    slide.setAttribute("aria-roledescription", "slide");
    slide.setAttribute("aria-label", `${slideIndex + 1} of ${slideIndex + 1}`);

    slide.innerHTML = `
    <div class="deletion-guard" contenteditable="true"></div>
<div class="carousel-image" contenteditable="false">
<div contenteditable="true">
  <img src="https://placehold.co/600x400/EEE/31343C?text=Image" alt="" class="d-block w-100">
</div>
</div>
<div class="deletion-guard" contenteditable="true"></div>
<div class="carousel-caption d-md-block" contenteditable="false">
  <h3 contenteditable="false"><span contenteditable="true">Heading </span></h3>
<div contenteditable="true">
  <p>Paragraph </p>
  </div>
</div>
<div class="deletion-guard" contenteditable="true"></div>
`;
    carouselInner.appendChild(slide);

    // Update carousel indicators and ARIA
    updateCarouselIndicators(container);
    updateCarouselSlidesAria(container);
  }

  function ensureUniqueCarouselId(container) {
  const carousel = container.querySelector(".carousel");
  if (!carousel.id || carousel.id === "carouselExample" || carousel.id.includes("carousel-example")) {
    const uniqueId = "carousel-" + Date.now() + "-" + Math.floor(Math.random() * 1000);
    carousel.id = uniqueId;

    // Update ALL references to the carousel ID
    const controls = carousel.querySelectorAll("[data-bs-target]");
    controls.forEach(control => {
      control.setAttribute("data-bs-target", "#" + uniqueId);
    });

    // Update any aria-labelledby attributes that reference the old ID
    const ariaElements = carousel.querySelectorAll("[aria-labelledby]");
    ariaElements.forEach(el => {
      const value = el.getAttribute("aria-labelledby");
      if (value && value.includes("carousel")) {
        el.setAttribute("aria-labelledby", uniqueId);
      }
    });
  }
  return carousel.id;
}


  // Strip bootstrap-custom-cleanup.js's runtime guards/state (data-bb-* attributes,
  // .is-last-slide) before exporting, so pasted/duplicated markup always starts
  // clean instead of carrying over a stale guard that blocks re-initialization
  // (e.g. the carousel's "Back to Start" label never rebinding on a duplicate).
  function stripRuntimeArtifacts(root) {
    [root, ...root.querySelectorAll('*')].forEach((el) => {
      Array.from(el.attributes || []).forEach((attr) => {
        if (attr.name.indexOf('data-bb-') === 0) el.removeAttribute(attr.name);
      });
      if (el.classList) el.classList.remove('is-last-slide');
    });
  }

  function generateCarouselCode(container) {
  // Clone the container to avoid modifying the original
  const containerClone = container.cloneNode(true);
  stripRuntimeArtifacts(containerClone);

  // Force wysiwyg-mode so every slide stacks and stays visible for editing,
  // even if the runtime cleanup already stripped it off the live element.
  containerClone.querySelectorAll('.carousel').forEach(el => el.classList.add('wysiwyg-mode'));

  // Normalize contenteditable so every slide's image/caption is editable,
  // even stale/first slides the runtime cleanup already locked down.
  containerClone.querySelectorAll('.carousel-image > div, .carousel-caption > div').forEach(el => {
    el.setAttribute('contenteditable', 'true');
  });

  // Remove instruction paragraphs from the cloned container
  const instructionText = "Use the arrows to change slides.";
  containerClone.querySelectorAll("p").forEach((paragraph) => {
    if (paragraph.textContent.includes(instructionText)) {
      paragraph.remove();
    }
  });

  // Apply unique IDs to the cloned content before returning
  const clonedHtml = containerClone.innerHTML.trim();
  const updatedHtml = updateCarouselIds(clonedHtml);

  return `
  ${updatedHtml}
`;
}


  function addTextCarouselSlide(container) {
    const carousel = container.querySelector(".text-carousel");
    const carouselInner = carousel.querySelector(".carousel-inner");
    const slideIndex = carouselInner.children.length;
    const carouselId = ensureUniqueTextCarouselId(container);

    const slide = document.createElement("div");
    slide.className = "carousel-item" + (slideIndex === 0 ? " active" : "");
    slide.id = `${carouselId}-item-${slideIndex}`;
    slide.setAttribute("role", "tabpanel");
    slide.setAttribute("aria-roledescription", "slide");
    slide.setAttribute("aria-label", `${slideIndex + 1} of ${slideIndex + 1}`);

    slide.innerHTML = `
    <div class="deletion-guard" contenteditable="true"></div>
<div class="text-carousel-content">
  <h3 contenteditable="false"><span contenteditable="true">TextSlide${slideIndex + 1} </span></h3>
<div contenteditable="true">
  <p>ContentTextSlide${slideIndex + 1} </p>
</div>
</div>
<div class="deletion-guard" contenteditable="true"></div>
`;

    carouselInner.appendChild(slide);

    // Update carousel indicators and ARIA
    updateTextCarouselIndicators(container);
    updateTextCarouselSlidesAria(container);

    // Update slide count
    const slideCountElement = document.getElementById("text-slide-count");
    if (slideCountElement) {
      slideCountElement.textContent = carouselInner.children.length;
    }
  }

  // Ensure unique ID for text carousel
 function ensureUniqueTextCarouselId(container) {
  const carousel = container.querySelector(".text-carousel");
  if (!carousel.id || carousel.id === "textCarouselExample" || carousel.id.includes("text-carousel-example")) {
    const uniqueId = "text-carousel-" + Date.now() + "-" + Math.floor(Math.random() * 1000);
    carousel.id = uniqueId;

    // Update ALL references to the carousel ID - use a more general selector
    const controls = carousel.querySelectorAll("[data-bs-target]");
    controls.forEach(control => {
      control.setAttribute("data-bs-target", "#" + uniqueId);
    });

    // Update any aria-labelledby attributes
    const ariaElements = carousel.querySelectorAll("[aria-labelledby]");
    ariaElements.forEach(el => {
      const value = el.getAttribute("aria-labelledby");
      if (value && value.includes("carousel")) {
        el.setAttribute("aria-labelledby", uniqueId);
      }
    });
  }
  return carousel.id;
}


  // Update text carousel indicators
  function updateTextCarouselIndicators(container) {
    const carousel = container.querySelector(".text-carousel");
    const carouselId = carousel.id;
    const carouselInner = carousel.querySelector(".carousel-inner");
    const slides = carouselInner.querySelectorAll(".carousel-item");

    let indicators = carousel.querySelector(".text-carousel-indicators");

    if (!indicators) {
      indicators = document.createElement("div");
      indicators.className = "carousel-indicators text-carousel-indicators";
      indicators.setAttribute("role", "tablist");
      carousel.querySelector(".text-carousel-container").before(indicators);
    } else {
      indicators.innerHTML = "";
      indicators.setAttribute("role", "tablist");
    }

    slides.forEach((slide, index) => {
      const slideId = slide.id || `${carouselId}-item-${index}`;

      // Ensure slide has proper ID
      slide.id = slideId;

      const button = document.createElement("button");
      button.type = "button";
      button.setAttribute("data-bs-target", "#" + carouselId);
      button.setAttribute("data-bs-slide-to", index);
      button.setAttribute("role", "tab");
      button.setAttribute("aria-controls", slideId);

      if (slide.classList.contains("active")) {
        button.className = "active";
        button.setAttribute("aria-selected", "true");
        button.setAttribute("aria-current", "true");
      } else {
        button.setAttribute("aria-selected", "false");
      }

      button.setAttribute("aria-label", `Slide ${index + 1}`);
      indicators.appendChild(button);
    });
  }

  // Update ARIA attributes for text carousel slides
  function updateTextCarouselSlidesAria(container) {
    const carousel = container.querySelector(".text-carousel");
    const carouselId = carousel.id;
    const carouselInner = carousel.querySelector(".carousel-inner");
    const slides = carouselInner.querySelectorAll(".carousel-item");
    const slideCount = slides.length;

    // Update ARIA for each slide
    slides.forEach((slide, index) => {
      const slideId = `${carouselId}-item-${index}`;
      slide.id = slideId;
      slide.setAttribute("role", "tabpanel");
      slide.setAttribute("aria-roledescription", "slide");
      slide.setAttribute("aria-label", `${index + 1} of ${slideCount}`);
    });
  }

  // Generate code for text carousel
  function generateTextCarouselCode(container) {
  // Clone the container to avoid modifying the original
  const containerClone = container.cloneNode(true);
  stripRuntimeArtifacts(containerClone);

  // Force wysiwyg-mode so every slide stacks and stays visible for editing,
  // even if the runtime cleanup already stripped it off the live element.
  containerClone.querySelectorAll('.text-carousel').forEach(el => el.classList.add('wysiwyg-mode'));

  // Normalize contenteditable so every slide's text is editable, even
  // stale/first slides the runtime cleanup already locked down.
  containerClone.querySelectorAll('.text-carousel-content > div').forEach(el => {
    el.setAttribute('contenteditable', 'true');
  });

  // Remove instruction paragraphs from the cloned container
  const instructionText = "Use the arrows to change slides.";
  containerClone.querySelectorAll("p").forEach((paragraph) => {
    if (paragraph.textContent.includes(instructionText)) {
      paragraph.remove();
    }
  });

  // Apply unique IDs to the cloned content before returning
  const clonedHtml = containerClone.innerHTML.trim();
  const updatedHtml = updateTextCarouselIds(clonedHtml);

  return `
${updatedHtml}

`;
}


  // Update text carousel IDs for copy function
function updateTextCarouselIds(htmlString) {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = htmlString;

  // Generate a unique carousel ID
  const newCarouselId = generateUniqueId("text-carousel");

  // Update the main carousel ID
  const carousel = tempDiv.querySelector(".text-carousel");
  if (carousel) {
    carousel.id = newCarouselId;
  }

  // Update ALL controls that reference this carousel
  const controls = tempDiv.querySelectorAll("[data-bs-target]");
  controls.forEach((control) => {
    const target = control.getAttribute("data-bs-target");
    // More inclusive check for any carousel reference
    if (target && (target.includes("text-carousel") || target.includes("carousel"))) {
      control.setAttribute("data-bs-target", `#${newCarouselId}`);
    }
  });

  // Update slide IDs and ARIA attributes
  const slides = tempDiv.querySelectorAll(".carousel-item");
  slides.forEach((slide, index) => {
    const newSlideId = `${newCarouselId}-item-${index}`;
    slide.id = newSlideId;
    slide.setAttribute("aria-label", `${index + 1} of ${slides.length}`);
  });

  // Update any aria-controls attributes
  const ariaControls = tempDiv.querySelectorAll("[aria-controls]");
  ariaControls.forEach((el) => {
    const value = el.getAttribute("aria-controls");
    if (value && value.includes("carousel")) {
      // Update to reference the slide ID, not the carousel ID
      const slideIndex = el.getAttribute("data-bs-slide-to") || "0";
      el.setAttribute("aria-controls", `${newCarouselId}-item-${slideIndex}`);
    }
  });

  return tempDiv.innerHTML;
}


  function initializeTextCarouselAria(container) {
    const carousel = container.querySelector(".text-carousel");
    const carouselId = carousel.id;

    // Set ARIA on main carousel element
    carousel.setAttribute("aria-roledescription", "carousel");
    carousel.setAttribute("aria-label", "Text carousel");
    carousel.setAttribute("contenteditable", "false");
    carousel.classList.add("carousel", "slide", "wysiwyg-mode");

    // Set ARIA on controls
    const prevButton = carousel.querySelector(".text-carousel-control-prev");
    const nextButton = carousel.querySelector(".text-carousel-control-next");

    if (prevButton) {
      prevButton.setAttribute("aria-label", "Previous slide");
    }

    if (nextButton) {
      nextButton.setAttribute("aria-label", "Next slide");
    }

    // Update slides with proper ARIA
    updateTextCarouselSlidesAria(container);
  }

 function addTableRow(container) {
    const table = container.querySelector("table");
    const tbody = table.querySelector("tbody");
    const rows = tbody.querySelectorAll("tr");
    const rowCount = rows.length;
    const headerCells = table.querySelectorAll("thead th").length;

    // Create a new row
    const newRow = document.createElement("tr");

    // Add cells based on the current header style
    if (headerStyle === 0) {
      // Standard table - all cells are data cells
      for (let i = 0; i < headerCells; i++) {
        const cell = document.createElement("td");
        cell.textContent = "Data";
        newRow.appendChild(cell);
      }
    } else {
      // Tables with row headers - first cell is a header
      const headerCell = document.createElement("th");
      headerCell.setAttribute("scope", "row");
      headerCell.classList.add("header-cell"); // Add class for styling
      headerCell.textContent = `Header`;
      newRow.appendChild(headerCell);

      // Add remaining data cells
      const dataColumns = rows[0].cells.length - 1; // Subtract 1 for the header cell
      for (let i = 0; i < dataColumns; i++) {
        const cell = document.createElement("td");
        cell.textContent = "Data";
        newRow.appendChild(cell);
      }
    }

    tbody.appendChild(newRow);
  }

  function addTableColumn(container) {
    const table = container.querySelector("table");
    const thead = table.querySelector("thead");
    const tbody = table.querySelector("tbody");
    const columnIndex = tbody.querySelector("tr").cells.length;

    // Handle column addition based on header style
    if (headerStyle === 0) {
      // Standard table - add a header cell to the header row
      const headerRow = thead.querySelector("tr");
      const headerCell = document.createElement("th");
      headerCell.setAttribute("scope", "col");
      headerCell.textContent = `Header`;
      headerRow.appendChild(headerCell);

      // Add data cells to each body row
      tbody.querySelectorAll("tr").forEach((row) => {
        const cell = document.createElement("td");
        cell.textContent = "Data";
        row.appendChild(cell);
      });
    } else if (headerStyle === 1) {
      // Column headers on left - the thead should have only one header cell
      // No need to modify the header row

      // Add data cells to each body row
      tbody.querySelectorAll("tr").forEach((row) => {
        const cell = document.createElement("td");
        cell.textContent = "Data";
        row.appendChild(cell);
      });
    } else if (headerStyle === 2) {
      // Both row and column headers
      // Add a header cell to the header row
      const headerRow = thead.querySelector("tr");
      const headerCell = document.createElement("th");
      headerCell.setAttribute("scope", "col");
      headerCell.textContent = `Header`;
      headerRow.appendChild(headerCell);

      // Add data cells to each body row
      tbody.querySelectorAll("tr").forEach((row) => {
        const cell = document.createElement("td");
        cell.textContent = "Data";
        row.appendChild(cell);
      });
    }
  }

  function removeTableColumn(container) {
    const table = container.querySelector("table");
    const rows = table.querySelectorAll("tr");

    if (rows[0].children.length > 1) {
      rows.forEach((row) => {
        row.lastElementChild.remove();
      });
    }
  }

  function generateTableCode(container) {
    // Create a clean copy of the table HTML
    return `
<div class="col-12">
  ${container.innerHTML.trim()}
</div>
`;
  }

  function removeTableRow(container) {
    const table = container.querySelector("table");
    const tbody = table.querySelector("tbody");
    const rows = tbody.querySelectorAll("tr");

    // Don't remove if there's only one row left
    if (rows.length > 1) {
      // Remove the last row
      tbody.lastElementChild.remove();

      // Update any ARIA or status information
      const statusRegion = document.querySelector(".table-status");
      if (statusRegion) {
        statusRegion.textContent = `Removed a row. Table now has ${
          rows.length - 1
        } rows.`;
      }
    } else {
      // Optional: Show a message that you can't remove the last row
      const statusRegion = document.querySelector(".table-status");
      if (statusRegion) {
        statusRegion.textContent = `Cannot remove the last row.`;
      }
    }
  }

  function addRevealTableRow(container) {
    const tbody = container.querySelector("tbody");
    const rowCount = tbody.children.length;
    const revealId = "tableReveal-" + Date.now() + "-" + rowCount;

    const newRow = document.createElement("tr");
    newRow.innerHTML = `
    <td contenteditable="false" class="flex-column"><div contenteditable="true">Content</div>
    <button class="btn btn-secondary mt-2 mx-auto" type="button" id="cell-button-${revealId}" data-bs-toggle="collapse" data-bs-target="#cell-${revealId}" aria-expanded="true" aria-controls="cell-${revealId}" contenteditable="false"><span contenteditable="true">Reveal</span></button></td>
    <td>
  <div class="collapse table-collapse show" id="cell-${revealId}" role="region" aria-labelledby="cell-button-${revealId}">
    <div contenteditable="false"><div contenteditable="true">Row1RevealContent${rowCount + 1} </div></div>
  </div>
</td>
  `;

    tbody.appendChild(newRow);
  }

  // Function to update the table structure based on header style
  function cycleTableHeaders(container) {
    const tableResponsive = container.querySelector(".table-responsive");
    const statusRegion = document.querySelector(".table-status");

    // Update status for screen readers
    if (statusRegion) {
      statusRegion.textContent = `Changing table header style to ${
        headerStyle === 0
          ? "column headers"
          : headerStyle === 1
          ? "both row and column headers"
          : "row headers only"
      }`;
    }

    if (headerStyle === 0) {
      // Row headers to column headers
      tableResponsive.innerHTML = `
      <table class="table"><caption>Caption </caption>
        <tbody>
          <tr>
            <th scope="row" class="header-cell">Header </th>
            <td>Data </td>
            <td>Data </td>
          </tr>
          <tr>
            <th scope="row" class="header-cell">Header </th>
            <td>Data </td>
            <td>Data </td>
          </tr>
        </tbody>
      </table>
    `;
      headerStyle = 1;
    } else if (headerStyle === 1) {
      // Column headers to both
      tableResponsive.innerHTML = `
      <table class="table"><caption>Caption </caption>
        <thead>
          <tr>
            <th style="background-color: var(--bs-text)" aria-description="Headers for rows and columns"></th>
            <th scope="col">Header </th>
            <th scope="col">Header </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row" class="header-cell">Header </th>
            <td>Data </td>
            <td>Data </td>
          </tr>
          <tr>
            <th scope="row" class="header-cell">Header </th>
            <td>Data </td>
            <td>Data </td>
          </tr>
        </tbody>
      </table>
    `;
      headerStyle = 2;
    } else {
      // Both back to row headers
      tableResponsive.innerHTML = `
      <table class="table"><caption>Caption </caption>
        <thead>
          <tr>
            <th scope="col">Header </th>
            <th scope="col">Header </th>
            <th scope="col">Header </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Data </td>
            <td>Data </td>
            <td>Data </td>
          </tr>
          <tr>
            <td>Data </td>
            <td>Data </td>
            <td>Data </td>
          </tr>
        </tbody>
      </table>
    `;
      headerStyle = 0;
    }

  }

  function generateRevealTableCode(container) {
  // Clone the container to avoid modifying the original
  const containerClone = container.cloneNode(true);
  stripRuntimeArtifacts(containerClone);
  // Learner-runtime artifacts added to the live preview must not reach the
  // exported markup: scroll arrow + .table-scroll-wrap wrapper, fade-in,
  // and the builder-only row class and placeholder comment.
  containerClone.querySelectorAll('.scroll-arrow').forEach(el => el.remove());
  containerClone.querySelectorAll('.table-scroll-wrap').forEach(wrap => {
    while (wrap.firstChild) wrap.parentNode.insertBefore(wrap.firstChild, wrap);
    wrap.remove();
  });
  containerClone.querySelectorAll('.reveal-table').forEach(el => el.classList.remove('row', 'fade-in'));
  const commentWalker = document.createTreeWalker(containerClone, NodeFilter.SHOW_COMMENT);
  const comments = [];
  while (commentWalker.nextNode()) comments.push(commentWalker.currentNode);
  comments.forEach(c => c.remove());
  containerClone.querySelectorAll('td > div').forEach(el => el.setAttribute('contenteditable', 'true'));
  containerClone.querySelectorAll('.collapse div, .collapse span').forEach(el => {
    if (el.hasAttribute('contenteditable')) el.setAttribute('contenteditable', 'true');
  });
  // Caption/headers should always stay editable regardless of runtime cleanup.
  // Remove the attribute rather than forcing "true" — they already inherit
  // editability from the row wrapper, and an explicit contenteditable here
  // makes the table plugin treat them as separate regions (reordering the
  // caption and splitting column widths 50/50), same as the working <td>
  // that already has no explicit attribute at all.
  containerClone.querySelectorAll('caption, th').forEach(el => el.removeAttribute('contenteditable'));
  containerClone.querySelectorAll('p').forEach(p => {
    if (p.textContent.includes('Select buttons to reveal content')) p.remove();
  });

    // Fix IDs and aria-controls attributes
    containerClone
      .querySelectorAll('[data-bs-toggle="collapse"]')
      .forEach((button, index) => {
        const uniqueId = `reveal-tables-${Date.now()}-${index}`;
        const target = button.getAttribute("data-bs-target").substring(1); // Remove the # from the target

        // Update button attributes
        button.id = `reveal-button-${uniqueId}`;
        button.setAttribute("data-bs-target", `#${uniqueId}`);
        button.setAttribute("aria-controls", uniqueId);

        // Force visible/editable state regardless of any runtime baseline
        // collapse that already ran against this row (e.g. the first one).
        const label = button.querySelector("span");
        if (label) label.setAttribute("contenteditable", "true");
        button.classList.remove("collapsed");
        button.setAttribute("aria-expanded", "true");

        // Find and update corresponding collapse element
        const collapse = containerClone.querySelector(`#${target}`);
        if (collapse) {
          collapse.id = uniqueId;
          collapse.setAttribute("aria-labelledby", `reveal-button-${uniqueId}`);
          collapse.classList.add("show");
          collapse.removeAttribute("aria-hidden");
        }
      });

    // Return clean HTML with proper structure
    return `
  

<div class="col-12">
  
    ${containerClone.innerHTML.trim()}
  

</div>

`;
  }

  function addRevealItem(container) {
    const itemCount = container.querySelectorAll(".reveal-container").length;
    const uniqueId = "reveal-" + Date.now() + "-" + itemCount;

    const revealElement = document.createElement("div");
    revealElement.className = "reveal-container mb-4";
    revealElement.innerHTML = `

    <button class="btn btn-secondary reveal-button" id="reveal-button-${uniqueId}" type="button" data-bs-toggle="collapse" data-bs-target="#reveal-${uniqueId}" aria-expanded="true" aria-controls="reveal-${uniqueId}" contenteditable="false"><span contenteditable="true">Reveal</span></button>
    <div class="row wysiwyg-mode">
      <div class="reveal-item">
        <div class="collapse show" id="reveal-${uniqueId}" role="region" aria-labelledby="reveal-button-${uniqueId}">

          
          <div contenteditable="false"><div contenteditable="true">
          <p>Paragraph </p>
          </div>
</div>
          
        </div>
      </div>
    </div>

    
  `;

    container.appendChild(revealElement);
  }

  function generateRevealCode(container) {
  // Clone the container to avoid modifying the original
  const containerClone = container.cloneNode(true);
  stripRuntimeArtifacts(containerClone);
  // Remove any runtime-added "Select button to reveal content." instruction
  // paragraph before re-marking remaining <p> elements editable — otherwise
  // it survives the export as real content and the runtime script adds a
  // second one on top of it once pasted.
  containerClone.querySelectorAll('.reveal-container p').forEach(p => {
    if (p.textContent.trim() === 'Select button to reveal content.') p.remove();
  });
  containerClone.querySelectorAll('.reveal-container p').forEach(p => p.setAttribute('contenteditable', 'true'));
  containerClone.querySelectorAll('.reveal-item .collapse > div > div').forEach(el => el.setAttribute('contenteditable', 'true'));
  // Process each reveal container to generate unique IDs
  containerClone
    .querySelectorAll('.reveal-container')
    .forEach((revealContainer, index) => {
        const uniqueId = "reveal-" + Date.now() + "-" + index;
        const button = revealContainer.querySelector(".reveal-button");
        const collapse = revealContainer.querySelector(".collapse");

        button.setAttribute("data-bs-target", "#" + uniqueId);
        collapse.id = uniqueId;

        // Force visible/editable state regardless of any runtime baseline
        // collapse that already ran against this item (e.g. the first one).
        const label = button.querySelector("span");
        if (label) label.setAttribute("contenteditable", "true");
        button.classList.remove("collapsed");
        button.setAttribute("aria-expanded", "true");
        collapse.classList.add("show");
        collapse.removeAttribute("aria-hidden");
      });

    // Return the HTML with updated IDs and proper column wrapper
    return `
  

<div class="col-12">
  
    ${containerClone.innerHTML.trim()}
  

</div>

  
`;
  }


  function updateComponentIds(htmlString, componentType) {
    if (componentType === "text-carousels") {
      return updateTextCarouselIds(htmlString);
    } else if (
      componentType === "accordions" ||
      componentType === "numbered-accordions" ||
      componentType === "icon-accordions"
    ) {
      return updateAccordionIds(htmlString);
    } else {
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = htmlString;

      // Get all elements with IDs
      const elementsWithIds = tempDiv.querySelectorAll("[id]");
      const idMap = {}; // To map old IDs to new ones

      // Replace all IDs with unique ones
      elementsWithIds.forEach((el) => {
        const oldId = el.id;
        const newId = generateUniqueId(componentType + "-");
        idMap[oldId] = newId;
        el.id = newId;
      });

      // Update all references to these IDs
      const attributesToCheck = [
        "data-bs-target",
        "aria-controls",
        "aria-labelledby",
        "href",
      ];

      attributesToCheck.forEach((attr) => {
        const elementsWithAttr = tempDiv.querySelectorAll(`[${attr}]`);
        elementsWithAttr.forEach((el) => {
          const value = el.getAttribute(attr);
          // Check if it's an ID reference (starts with # and matches one of our old IDs)
          if (value.startsWith("#") && idMap[value.substring(1)]) {
            el.setAttribute(attr, `#${idMap[value.substring(1)]}`);
          }
        });
      });

      return tempDiv.innerHTML;
    }
  }


function initializeColumnSection() {
    const textSection = document.querySelector('.component-section[data-name="Text and Lists"]');
    const imagesSection = document.querySelector('.component-section[data-name="Images"]');
    if (!textSection || !imagesSection) return;

    const textCopyConfigs = [
{
        selector: ".copy-2-col",
        wysiwygSelector: ".copy-2-col-wysiwyg",
        code: `
<div class="columns-2" contenteditable="false">
  <div class="col-12 col-sm-6"><div contenteditable="true"><p>Content </p></div></div>
  <div class="col-12 col-sm-6"><div contenteditable="true"><p>Content </p></div></div>
</div>
`
      },
      {
        selector: ".copy-2-col-no-line",
        wysiwygSelector: ".copy-2-col-no-line-wysiwyg",
        code: `
<div class="columns-2-no-line" contenteditable="false">
  <div class="col-12 col-sm-6"><div contenteditable="true"><p>Content </p></div></div>
    <div class="col-12 col-sm-6"><div contenteditable="true"><p>Content </p></div></div>
</div>
`
      },
      {
        selector: ".copy-3-col",
        wysiwygSelector: ".copy-3-col-wysiwyg",
        code: `
<div class="columns-3" contenteditable="false">
  <div class="col-12 col-md-4"><div contenteditable="true"><p>Content </p></div></div>
  <div class="col-12 col-md-4"><div contenteditable="true"><p>Content </p></div></div>
  <div class="col-12 col-md-4"><div contenteditable="true"><p>Content </p></div></div>
</div>
`
      },
      {
        selector: ".copy-large-number-list",
        wysiwygSelector: ".copy-large-number-list-wysiwyg",
        code: `
<div contenteditable="false">
  <ol class="large-number" contenteditable="true">
    <li content-editable="true">Item </li>
    <li content-editable="true">Item </li>
  </ol>
</div>
`
      }
    ];
    
    // Define all copy configurations
    const imageCopyConfigs = [
      {
        selector: ".copy-image-placeholder",
        wysiwygSelector: ".copy-image-placeholder-wysiwyg",
        code: `
<div class="col-12">
<div class="figure-wrapper">
<figure class="wysiwyg-mode" contenteditable="false">
<div class="image-container" contenteditable="true">
<img src="https://placehold.co/1920x1080/EEE/31343C" alt="REQUIRED" class="img-fluid">
</div>
<figcaption contenteditable="false"><span contenteditable="true">Caption </span></figcaption>
</figure>
</div>
</div>
`
      },
      {
        selector: ".copy-decorative-image-placeholder",
        wysiwygSelector: ".copy-decorative-image-placeholder-wysiwyg",
        code: `
<div class="col-12">
<div class="figure-wrapper">
<figure class="decorative" contenteditable="false"><div class="image-container" contenteditable="true">
<img src="https://placehold.co/1920x1080/EEE/31343C" alt="" class="img-fluid">
</figure>
</div>
</div>
`
      }
    ];

    // Set up all copy buttons using the unified system
    textCopyConfigs.forEach(config => {
  const btnHtml = textSection.querySelector(config.selector);
  const btnWysiwyg = textSection.querySelector(config.wysiwygSelector);
  if (btnHtml) btnHtml.addEventListener('click', () => universalCopy(config.code, false));
  if (btnWysiwyg) btnWysiwyg.addEventListener('click', () => universalCopy(config.code, true));
});

// Setup image section copy buttons
imageCopyConfigs.forEach(config => {
  const btnHtml = imagesSection.querySelector(config.selector);
  const btnWysiwyg = imagesSection.querySelector(config.wysiwygSelector);
  if (btnHtml) btnHtml.addEventListener('click', () => universalCopy(config.code, false));
  if (btnWysiwyg) btnWysiwyg.addEventListener('click', () => universalCopy(config.code, true));
});


    // Helper function to get icon class from the single visible preview (icon-column-right)
    function getIconClassFromElement() {
        const iconElement = document.querySelector("#icon-column-right .icon-container i, #icon-column-right .icon-container span");
        
        if (!iconElement) {
            return "bi bi-info icon-xl"; // default Bootstrap icon
        }
        
        // Return appropriate class based on icon type
        if (iconElement.classList.contains("material-symbols-outlined")) {
            return `material-symbols-outlined">${iconElement.textContent}</span><span class="material-symbols-outlined`;
        } else if (iconElement.classList.contains("material-icons")) {
            return `material-icons">${iconElement.textContent}</span><span class="material-icons`;
        } else if (iconElement.classList.contains("hgi-stroke")) {
            return iconElement.className;
        } else {
            return iconElement.className; // Bootstrap or Health Icons
        }
    }

    // Icon on Right copy buttons (unchanged)
    const iconColButton = imagesSection.querySelector(".copy-icon-col");
    if (iconColButton) {
        iconColButton.addEventListener("click", () => {
            const iconClass = getIconClassFromElement();
            
            const code = `
<div class="image-column">
  <div class="col-12 col-sm-6" contenteditable="false"><div contenteditable="true"><p>Paragraph </p></div></div>
  <div class="col-12 col-sm-6 icon-container" contenteditable="false" style="white-space: nowrap;">
    <div class="d-flex justify-content-center align-items-center h-100">
      <i class="${iconClass}" aria-hidden="true"></i>
    </div>
  </div>
</div>
`;
            universalCopy(code, false);
        });
    }

    const iconColWysiwygButton = imagesSection.querySelector(".copy-icon-col-wysiwyg");
    if (iconColWysiwygButton) {
        iconColWysiwygButton.addEventListener("click", () => {
            const iconClass = getIconClassFromElement();
            
            const code = `
<div class="image-column">
  <div class="col-12 col-sm-6" contenteditable="false"><div contenteditable="true"><p>Paragraph </p></div></div>
  <div class="col-12 col-sm-6 icon-container" contenteditable="false" style="white-space: nowrap;">
    <div class="d-flex justify-content-center align-items-center h-100">
      <i class="${iconClass}" aria-hidden="true"></i>
    </div>
  </div>
</div>
`;
            universalCopy(code, true);
        });
    }

    // Icon on Left copy buttons - now get icon from the right preview
    const iconColLeftButton = imagesSection.querySelector(".copy-icon-left-col");
    if (iconColLeftButton) {
        iconColLeftButton.addEventListener("click", () => {
            const iconClass = getIconClassFromElement(); // Gets icon from right preview
            
            const code = `
<div class="image-column">
  <div class="col-12 col-sm-6">
    <div class="icon-container" contenteditable="false" style="white-space: nowrap;">
      <div class="d-flex justify-content-center align-items-center h-100">
        <i class="${iconClass}" aria-hidden="true"></i>
      </div>
    </div>
  </div>
  <div class="col-12 col-sm-6" contenteditable="false"><div contenteditable="true"><p>Paragraph </p></div></div>
</div>
`;
            universalCopy(code, false);
        });
    }

    const iconColLeftWysiwygButton = imagesSection.querySelector(".copy-icon-left-col-wysiwyg");
    if (iconColLeftWysiwygButton) {
        iconColLeftWysiwygButton.addEventListener("click", () => {
            const iconClass = getIconClassFromElement(); // Gets icon from right preview
            
            const code = `
<div class="image-column">
  <div class="col-12 col-sm-6">
    <div class="icon-container" contenteditable="false" style="white-space: nowrap;">
      <div class="d-flex justify-content-center align-items-center h-100">
        <i class="${iconClass}" aria-hidden="true"></i>
      </div>
    </div>
  </div>
  <div class="col-12 col-sm-6" contenteditable="false"><div contenteditable="true"><p>Paragraph </p></div></div>
</div>
`;
            universalCopy(code, true);
        });
    }



// Wide image left column (image left, text right)
const wideImgLeftColButton = imagesSection.querySelector(".copy-wide-img-left-col");
if (wideImgLeftColButton) {
  wideImgLeftColButton.addEventListener("click", () => {
    const code = `
<div class="image-column">
  <div class="col-12 col-md-6">
  <div class="figure-wrapper">
    <figure class="wysiwyg-mode">
      <div class="image-container" style="position: relative;" contenteditable="false">
      <div contenteditable="true">
        <img src="https://placehold.co/1920x1080/EEE/31343C" alt="REQUIRED" class="img-fluid">
        </div>
      </div>
      <figcaption contenteditable="false"><span contenteditable="true">Caption </span></figcaption>
    </figure>
    </div>
  </div>
  <div class="col-12 col-md-6" contenteditable="true">
    <p>Paragraph </p>
  </div>
</div>
`;
    universalCopy(code, false);
  });
}

// Wide image left column WYSIWYG (image left, text right)
const wideImgLeftColWysiwygButton = imagesSection.querySelector(".copy-wide-img-left-col-wysiwyg");
if (wideImgLeftColWysiwygButton) {
  wideImgLeftColWysiwygButton.addEventListener("click", () => {
    const code = `
<div class="image-column">
  <div class="col-12 col-md-6">
  <div class="figure-wrapper">
    <figure class="wysiwyg-mode">
      <div class="image-container" style="position: relative;" contenteditable="false">
      <div contenteditable="true">
        <img src="https://placehold.co/1920x1080/EEE/31343C" alt="REQUIRED" class="img-fluid">
        </div>
      </div>
      <figcaption contenteditable="false"><span contenteditable="true">Caption </span></figcaption>
    </figure>
    </div>
  </div>
  <div class="col-12 col-md-6" contenteditable="false">
  <div contenteditable="true">
    <p>Paragraph </p>
    </div>
  </div>
</div>
`;
    universalCopy(code, true);
  });
}

// Wide image column (text left, image right)
const wideImgColButton = imagesSection.querySelector(".copy-wide-img-col");
if (wideImgColButton) {
  wideImgColButton.addEventListener("click", () => {
    const code = `
<div class="image-column">
  <div class="col-12 col-md-6" contenteditable="false">
  <div contenteditable="true">
    <p>Paragraph </p>
    </div>
  </div>
  <div class="col-12 col-md-6">
  <div class="figure-wrapper">
    <figure class="wysiwyg-mode">
      <div class="image-container" style="position: relative;" contenteditable="false">
      <div contenteditable="true">
        <img src="https://placehold.co/1920x1080/EEE/31343C" alt="REQUIRED" class="img-fluid">
      </div>
      </div>
      <figcaption contenteditable="false"><span contenteditable="true">Caption </span></figcaption>
    </figure>
    </div>
  </div>
</div>
`;
    universalCopy(code, false);
  });
}

// Wide image column WYSIWYG (text left, image right)
const wideImgColWysiwygButton = imagesSection.querySelector(".copy-wide-img-col-wysiwyg");
if (wideImgColWysiwygButton) {
  wideImgColWysiwygButton.addEventListener("click", () => {
    const code = `
<div class="image-column">
  <div class="col-12 col-md-6" contenteditable="false">
  <div contenteditable="true">
    <p>Paragraph </p>
    </div>
  </div>
  <div class="col-12 col-md-6">
  <div class="figure-wrapper">
    <figure class="wysiwyg-mode">
      <div class="image-container" style="position: relative;" contenteditable="false">
      <div contenteditable="true">
        <img src="https://placehold.co/1920x1080/EEE/31343C" alt="REQUIRED" class="img-fluid">
      </div>
      </div>
      <figcaption contenteditable="false"><span contenteditable="true">Caption </span></figcaption>
    </figure>
    </div>
  </div>
</div>
`;
    universalCopy(code, true);
  });
}

// Add these after your existing wide image button handlers:

// Decorative image left column (image left, text right)
const wideImgLeftColDecorativeButton = imagesSection.querySelector(".copy-wide-img-left-col-decorative");
if (wideImgLeftColDecorativeButton) {
  wideImgLeftColDecorativeButton.addEventListener("click", () => {
    const code = `
<div class="image-column">
  <div class="col-12 col-md-6">
  <div class="figure-wrapper">
    <figure class="wysiwyg-mode decorative">
      <div class="image-container" style="position: relative;" contenteditable="false">
        <div contenteditable="true">
          <img src="https://placehold.co/1920x1080/EEE/31343C" alt="" class="img-fluid decorative">
        </div>
      </div>
    </figure>
    </div>
  </div>
  <div class="col-12 col-md-6" contenteditable="true">
    <p>Paragraph </p>
  </div>
</div>
`;
    universalCopy(code, false);
  });
}

// Decorative image left column WYSIWYG (image left, text right)
const wideImgLeftColDecorativeWysiwygButton = imagesSection.querySelector(".copy-wide-img-left-col-decorative-wysiwyg");
if (wideImgLeftColDecorativeWysiwygButton) {
  wideImgLeftColDecorativeWysiwygButton.addEventListener("click", () => {
    const code = `
<div class="image-column">
  <div class="col-12 col-md-6">
  <div class="figure-wrapper">
    <figure class="wysiwyg-mode decorative">
      <div class="image-container" style="position: relative;" contenteditable="false">
        <div contenteditable="true">
          <img src="https://placehold.co/1920x1080/EEE/31343C" alt="" class="img-fluid decorative">
        </div>
      </div>
    </figure>
    </div>
  </div>
  <div class="col-12 col-md-6" contenteditable="false">
    <div contenteditable="true">
      <p>Paragraph </p>
    </div>
  </div>
</div>
`;
    universalCopy(code, true);
  });
}

// Decorative image right column (text left, image right)
const wideImgColDecorativeButton = imagesSection.querySelector(".copy-wide-img-col-decorative");
if (wideImgColDecorativeButton) {
  wideImgColDecorativeButton.addEventListener("click", () => {
    const code = `
<div class="image-column">
  <div class="col-12 col-md-6" contenteditable="false">
    <div contenteditable="true">
      <p>Paragraph </p>
    </div>
  </div>
  <div class="col-12 col-md-6">
  <div class="figure-wrapper">
    <figure class="wysiwyg-mode decorative">
      <div class="image-container" style="position: relative;" contenteditable="false">
        <div contenteditable="true">
          <img src="https://placehold.co/1920x1080/EEE/31343C" alt="" class="img-fluid decorative">
        </div>
      </div>
    </figure>
    </div>
  </div>
</div>
`;
    universalCopy(code, false);
  });
}

// Decorative image right column WYSIWYG (text left, image right)
const wideImgColDecorativeWysiwygButton = imagesSection.querySelector(".copy-wide-img-col-decorative-wysiwyg");
if (wideImgColDecorativeWysiwygButton) {
  wideImgColDecorativeWysiwygButton.addEventListener("click", () => {
    const code = `
<div class="image-column">
  <div class="col-12 col-md-6" contenteditable="false">
    <div contenteditable="true">
      <p>Paragraph </p>
    </div>
  </div>
  <div class="col-12 col-md-6">
  <div class="figure-wrapper">
    <figure class="wysiwyg-mode decorative">
      <div class="image-container" style="position: relative;" contenteditable="false">
        <div contenteditable="true">
          <img src="https://placehold.co/1920x1080/EEE/31343C" alt="" class="img-fluid decorative">
        </div>
      </div>
    </figure>
    </div>
  </div>
</div>
`;
    universalCopy(code, true);
  });
}


}

/* ── Matching / Categorise ─────────────────────────────────────── */
function initializeMatchSection() {
  const builder = document.getElementById('matchBuilder');
  if (!builder) return;
  const section = builder.closest('.kc-tool');
  const modeLabel = section.querySelector('.match-mode-label');
  const MIN_BINS = 2, MIN_OPTS = 1;

  function makeOption() {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'match-option';
    b.setAttribute('contenteditable', 'false');
    b.innerHTML = '<span contenteditable="true">Option</span>';
    return b;
  }
  function makeBin() {
    const bin = document.createElement('div');
    bin.className = 'match-bin';
    bin.setAttribute('contenteditable', 'false');
    bin.innerHTML =
      '<div class="match-bin-label"><span contenteditable="true">Bin</span></div>' +
      '<div class="match-bin-options"></div>' +
      '<div class="match-bin-tools">' +
        '<button type="button" class="btn btn-sm btn-success add-option">+ Option</button> ' +
        '<button type="button" class="btn btn-sm btn-danger remove-option">\u2212 Option</button>' +
      '</div>';
    bin.querySelector('.match-bin-options').appendChild(makeOption());
    return bin;
  }
  function bins() { return [].slice.call(builder.querySelectorAll('.match-bin')); }
  function updateMode() {
    const max = bins().reduce(function (m, b) {
      return Math.max(m, b.querySelectorAll('.match-option').length);
    }, 0);
    modeLabel.textContent = max > 1 ? 'Categorise' : 'Matching';
  }

  while (bins().length < MIN_BINS) builder.appendChild(makeBin());
  updateMode();

  section.querySelector('.add-bin').addEventListener('click', function () {
    builder.appendChild(makeBin()); updateMode();
  });
  section.querySelector('.remove-bin').addEventListener('click', function () {
    if (bins().length > MIN_BINS) builder.lastElementChild.remove();
    updateMode();
  });

  builder.addEventListener('click', function (e) {
    const add = e.target.closest('.add-option');
    const rem = e.target.closest('.remove-option');
    if (add) {
      add.closest('.match-bin').querySelector('.match-bin-options').appendChild(makeOption());
      updateMode();
    } else if (rem) {
      const opts = rem.closest('.match-bin').querySelector('.match-bin-options');
      if (opts.children.length > MIN_OPTS) opts.lastElementChild.remove();
      updateMode();
    }
  });

  const codeBtn = section.querySelector('.copy-code');
  const wysiwygBtn = section.querySelector('.copy-wysiwyg');
  if (codeBtn) codeBtn.addEventListener('click', function () {
    navigator.clipboard.writeText(generateMatchCode(builder))
      .then(function () { showToast('HTML Copied', 'success'); })
      .catch(function () { showToast('Failed to copy HTML', 'error'); });
  });
  if (wysiwygBtn) wysiwygBtn.addEventListener('click', function () {
    const code = generateMatchCode(builder);
    copyForD2LTinyMCE(code).catch(function () {
      navigator.clipboard.writeText(code).then(function () {
        showToast('Copied as plain HTML code - paste in HTML view', 'error');
      });
    });
  });
}

function generateMatchCode(builder) {
  const rootId = generateUniqueId('match');
  const previewBins = [].slice.call(builder.querySelectorAll('.match-bin'));
  let maxOpts = 0;
  const binsHtml = [], optsHtml = [];

  previewBins.forEach(function (bin, i) {
    const binId = rootId + '-bin-' + (i + 1);
    const labelSpan = bin.querySelector('.match-bin-label span');
    const label = (labelSpan ? labelSpan.innerHTML : 'Bin').trim();

    binsHtml.push(
'    <div class="match-bin" data-bin-id="' + binId + '" data-bin-pos="Bin ' + (i + 1) + '" contenteditable="false">\n' +
'      <div class="match-bin-label"><span contenteditable="true">' + label + '</span></div>\n' +
'      <div class="match-bin-items"></div>\n' +
'    </div>'
    );

    const opts = [].slice.call(bin.querySelectorAll('.match-option'));
    if (opts.length > maxOpts) maxOpts = opts.length;
    opts.forEach(function (opt) {
      const s = opt.querySelector('span');
      const text = (s ? s.innerHTML : 'Option').trim();
      optsHtml.push(
'    <button class="match-option" data-bin="' + binId + '" data-bin-pos="Bin ' + (i + 1) + '" type="button" contenteditable="false"><span contenteditable="true">' + text + '</span></button>'
      );
    });
  });

  const mode = maxOpts > 1 ? 'categorise' : 'match';

  return (
'<div class="match" id="' + rootId + '" data-mode="' + mode + '" contenteditable="false">\n' +
'  <div class="match-bins">\n' + binsHtml.join('\n') + '\n  </div>\n' +
'  <div class="match-pool">\n' + optsHtml.join('\n') + '\n  </div>\n' +
'  <div class="match-controls" contenteditable="false">\n' +
'    <button class="match-check btn btn-primary" type="button">Check</button>\n' +
'    <button class="match-reset btn btn-secondary" type="button">Reset</button>\n' +
'    <p class="match-status" aria-live="polite"></p>\n' +
'  </div>\n' +
'</div>'
  );
}

/* ── Knowledge checks: shared copy wiring ──────────────────────── */
function wireKcCopy(tool, genFn) {
  var codeBtn = tool.querySelector('.copy-code');
  var wysiwygBtn = tool.querySelector('.copy-wysiwyg');
  if (codeBtn) codeBtn.addEventListener('click', function () {
    navigator.clipboard.writeText(genFn())
      .then(function () { showToast('HTML Copied', 'success'); })
      .catch(function () { showToast('Failed to copy HTML', 'error'); });
  });
  if (wysiwygBtn) wysiwygBtn.addEventListener('click', function () {
    var code = genFn();
    copyForD2LTinyMCE(code).catch(function () {
      navigator.clipboard.writeText(code).then(function () {
        showToast('Copied as plain HTML code - paste in HTML view', 'error');
      });
    });
  });
}

/* ── Knowledge checks: Choice (MCQ / SBA / select-all) ─────────── */
function initializeChoiceSection() {
  var builder = document.getElementById('choiceBuilder');
  if (!builder) return;
  var tool = builder.closest('.kc-tool');
  var list = builder.querySelector('.choice-build-list');
  var MIN = 2;

  function makeOption() {
    var row = document.createElement('div');
    row.className = 'choice-build-option d-flex align-items-center gap-2 mb-2';
    row.innerHTML =
      '<div class="form-check mb-0"><input class="form-check-input choice-correct" type="checkbox" title="Mark correct"></div>' +
      '<span class="choice-build-text flex-grow-1 border rounded p-2"></span>' +
      '<button type="button" class="btn btn-sm btn-danger choice-remove-option">\u2212</button>';
    return row;
  }
  function options() { return [].slice.call(builder.querySelectorAll('.choice-build-option')); }
  while (options().length < MIN) list.appendChild(makeOption());

  tool.querySelector('.choice-add-option').addEventListener('click', function () { list.appendChild(makeOption()); });
  builder.addEventListener('click', function (e) {
    var rem = e.target.closest('.choice-remove-option');
    if (rem && options().length > MIN) rem.closest('.choice-build-option').remove();
  });

  function gen() {
    var root = generateUniqueId('choice');
    var modeEl = tool.querySelector('input[name="choiceMode"]:checked');
    var mode = modeEl ? modeEl.value : 'single';
    var instr = mode === 'multi' ? 'Select all that apply.' : 'Select one answer.';
    var optHtml = options().map(function (row, i) {
      var correct = row.querySelector('.choice-correct').checked;
      var hint = correct ? ' data-correct-hint="\u2713 correct"' : '';
      return (
'    <button class="choice-option" data-correct="' + correct + '"' + hint + ' type="button" contenteditable="false">\n' +
'      <span class="choice-option-text" contenteditable="true">Option ' + (i + 1) + '</span>\n' +
'      <span class="kc-feedback" data-scope="option" contenteditable="true"></span>\n' +
'    </button>'
      );
    }).join('\n');
    return (
'<div class="choice" id="' + root + '" data-select="' + mode + '" contenteditable="false">\n' +
'  <p class="kc-instructions" contenteditable="true">' + instr + '</p>\n' +
'  <div class="choice-question" contenteditable="true"><p>Question text</p></div>\n' +
'  <div class="choice-options">\n' + optHtml + '\n  </div>\n' +
'  <div class="kc-feedback" data-when="correct" contenteditable="true"></div>\n' +
'  <div class="kc-feedback" data-when="incorrect" contenteditable="true"></div>\n' +
'  <div class="kc-controls" contenteditable="false">\n' +
'    <button class="kc-check btn btn-primary" type="button">Check</button>\n' +
'    <button class="kc-reset btn btn-secondary" type="button">Reset</button>\n' +
'    <p class="kc-status" aria-live="polite"></p>\n' +
'  </div>\n' +
'</div>'
    );
  }
  wireKcCopy(tool, gen);
}

/* ── Knowledge checks: Fill in the Blank ───────────────────────── */
function initializeFitbSection() {
  var builder = document.getElementById('fitbBuilder');
  if (!builder) return;
  var tool = builder.closest('.kc-tool');
  function gen() {
    var root = generateUniqueId('fitb');
    return (
'<div class="fitb" id="' + root + '" contenteditable="false">\n' +
'  <p class="kc-instructions" contenteditable="true">Fill in the blanks, then select Check.</p>\n' +
'  <div class="fitb-body" contenteditable="true">\n' +
'    <p>Mark each blank with double square brackets and separate accepted answers with a vertical bar, e.g. The capital of France is [[Paris]] and water boils at [[100|one hundred]] degrees Celsius.</p>\n' +
'  </div>\n' +
'  <div class="kc-feedback" data-when="correct" contenteditable="true"></div>\n' +
'  <div class="kc-feedback" data-when="incorrect" contenteditable="true"></div>\n' +
'  <div class="kc-controls" contenteditable="false">\n' +
'    <button class="kc-check btn btn-primary" type="button">Check</button>\n' +
'    <button class="kc-reset btn btn-secondary" type="button">Reset</button>\n' +
'    <p class="kc-status" aria-live="polite"></p>\n' +
'  </div>\n' +
'</div>'
    );
  }
  wireKcCopy(tool, gen);
}

(function () {
  function go() { initializeChoiceSection(); initializeFitbSection(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', go);
  else go();
})();

/* ── Knowledge checks: Ordering ───────────────────────────────── */
function initializeOrderingSection() {
  var builder = document.getElementById('orderingBuilder');
  if (!builder) return;
  var tool = builder.closest('.kc-tool');
  var list = builder.querySelector('.ordering-build-list');
  var MIN = 2;
  function makeItem() {
    var r = document.createElement('div');
    r.className = 'ordering-build-item d-flex align-items-center gap-2 mb-2';
    r.innerHTML = '<span class="ordering-build-text flex-grow-1 border rounded p-2"></span>' +
                  '<button type="button" class="btn btn-sm btn-danger ordering-remove">\u2212</button>';
    return r;
  }
  function items() { return [].slice.call(builder.querySelectorAll('.ordering-build-item')); }
  while (items().length < MIN) list.appendChild(makeItem());
  tool.querySelector('.ordering-add').addEventListener('click', function () { list.appendChild(makeItem()); });
  builder.addEventListener('click', function (e) {
    var rem = e.target.closest('.ordering-remove');
    if (rem && items().length > MIN) rem.closest('.ordering-build-item').remove();
  });
  function gen() {
    var root = generateUniqueId('ordering');
    var html = items().map(function (_, i) {
      return '    <div class="ordering-item" data-order="' + (i + 1) + '"><span class="ordering-text" contenteditable="true">Item ' + (i + 1) + '</span></div>';
    }).join('\n');
    return (
'<div class="ordering" id="' + root + '" contenteditable="false">\n' +
'  <p class="kc-instructions" contenteditable="true">Arrange these in the correct order, then select Check.</p>\n' +
'  <div class="ordering-list">\n' + html + '\n  </div>\n' +
'  <div class="kc-feedback" data-when="correct" contenteditable="true"></div>\n' +
'  <div class="kc-feedback" data-when="incorrect" contenteditable="true"></div>\n' +
'  <div class="kc-controls" contenteditable="false">\n' +
'    <button class="kc-check btn btn-primary" type="button">Check</button>\n' +
'    <button class="kc-reset btn btn-secondary" type="button">Reset</button>\n' +
'    <p class="kc-status" aria-live="polite"></p>\n' +
'  </div>\n' +
'</div>'
    );
  }
  wireKcCopy(tool, gen);
}

/* ── Knowledge checks: Mark the Words ─────────────────────────── */
function initializeMtwSection() {
  var builder = document.getElementById('mtwBuilder');
  if (!builder) return;
  var tool = builder.closest('.kc-tool');
  function gen() {
    var root = generateUniqueId('mtw');
    return (
'<div class="mtw" id="' + root + '" contenteditable="false">\n' +
'  <p class="kc-instructions" contenteditable="true">Select the correct words, then select Check.</p>\n' +
'  <div class="mtw-body" contenteditable="true">\n' +
'    <p>Mark each correct word by wrapping it in asterisks, e.g. The *mitochondria* is the powerhouse of the *cell*.</p>\n' +
'  </div>\n' +
'  <div class="kc-feedback" data-when="correct" contenteditable="true"></div>\n' +
'  <div class="kc-feedback" data-when="incorrect" contenteditable="true"></div>\n' +
'  <div class="kc-controls" contenteditable="false">\n' +
'    <button class="kc-check btn btn-primary" type="button">Check</button>\n' +
'    <button class="kc-reset btn btn-secondary" type="button">Reset</button>\n' +
'    <p class="kc-status" aria-live="polite"></p>\n' +
'  </div>\n' +
'</div>'
    );
  }
  wireKcCopy(tool, gen);
}

(function () {
  function go() { initializeOrderingSection(); initializeMtwSection(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', go);
  else go();
})();

/* ── Vertical timeline (display component) ─────────────────────── */
function initializeTimelineSection() {
  var builder = document.getElementById('timelineBuilder');
  if (!builder) return;
  var section = builder.closest('.component-section');
  var list = builder.querySelector('.timeline-build-list');
  var MIN = 1;
  function makeRow() {
    var r = document.createElement('div');
    r.className = 'timeline-build-item d-flex align-items-center gap-2 mb-2';
    r.innerHTML = '<span class="flex-grow-1 border rounded p-2 text-muted small">Timeline entry — date, title &amp; text edited in D2L</span>' +
                  '<button type="button" class="btn btn-sm btn-danger timeline-remove">\u2212</button>';
    return r;
  }
  function rows() { return [].slice.call(builder.querySelectorAll('.timeline-build-item')); }
  while (rows().length < MIN) list.appendChild(makeRow());
  section.querySelector('.timeline-add').addEventListener('click', function () { list.appendChild(makeRow()); });
  builder.addEventListener('click', function (e) {
    var rem = e.target.closest('.timeline-remove');
    if (rem && rows().length > MIN) rem.closest('.timeline-build-item').remove();
  });
  function gen() {
    var html = rows().map(function (_, i) {
      return (
'  <div class="timeline-item">\n' +
'    <span class="timeline-marker" aria-hidden="true"></span>\n' +
'    <div class="timeline-content">\n' +
'    <div contenteditable="true">\n' +
'      <p class="timeline-date">Date ' + (i + 1) + '</p>\n' +
'    </div>\n' +
'      <h3 contenteditable="false"><span contenteditable="true">Title ' + (i + 1) + '</span></h3>\n' +
'    <div contenteditable="true">\n' +
'      <p>Description.</p>\n' +
'    </div></div>\n' +
'  </div>'
      );
    }).join('\n');
    return '<div class="timeline" contenteditable="false">\n' + html + '\n</div>';
  }
  wireKcCopy(section, gen);
}

/* ── Image hotspots (labeled graphic) ──────────────────────────── */
function initializeHotspotSection() {
  var builder = document.getElementById('hotspotBuilder');
  if (!builder) return;
  var section = builder.closest('.component-section');
  var stage = builder.querySelector('.hotspot-stage');
  var wrap = builder.querySelector('.hotspot-image-wrap');
  var fileInput = section.querySelector('.hotspot-file');
  var gridToggle = section.querySelector('.hotspot-grid');
  var snapToggle = section.querySelector('.hotspot-snap');
  var listEl = builder.querySelector('.hotspot-marker-list');
  var aspect = null, seq = 0, markers = [];

  var stepSel = section.querySelector('.hotspot-step');
  function step() { return parseFloat(stepSel.value) || 10; }
  function applyGrid() { stage.style.setProperty('--hs-grid', step() + '%'); stage.classList.toggle('show-grid', gridToggle.checked); }
  stepSel.addEventListener('change', applyGrid);

  fileInput.addEventListener('change', function () {
    loadFile(fileInput.files && fileInput.files[0]);
  });

  function loadFile(f) {
    if (!f || !/^image\//.test(f.type)) return;
    var url = URL.createObjectURL(f), img = new Image();
    img.onload = function () {
      aspect = img.naturalWidth + ' / ' + img.naturalHeight;
      stage.style.aspectRatio = aspect;
      wrap.innerHTML = '<img class="hotspot-image" src="' + url + '" alt="">';
      var empty = stage.querySelector('.hotspot-empty'); if (empty) empty.remove();
    };
    img.src = url;
  }
  ['dragenter', 'dragover'].forEach(function (ev) {
    stage.addEventListener(ev, function (e) { e.preventDefault(); stage.classList.add('is-dragover'); });
  });
  ['dragleave', 'drop'].forEach(function (ev) {
    stage.addEventListener(ev, function (e) { e.preventDefault(); if (ev === 'dragleave' && stage.contains(e.relatedTarget)) return; stage.classList.remove('is-dragover'); });
  });
  stage.addEventListener('drop', function (e) {
    var f = e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0];
    if (f) loadFile(f);
  });

  gridToggle.addEventListener('change', applyGrid);

  function pct(cx, cy) {
    var r = stage.getBoundingClientRect();
    var x = ((cx - r.left) / r.width) * 100, y = ((cy - r.top) / r.height) * 100;
    if (snapToggle.checked) { var g = step(); x = Math.round(x / g) * g; y = Math.round(y / g) * g; }
    return { x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) };
  }
  function renderList() {
    listEl.innerHTML = markers.map(function (m) {
      return '<div class="d-flex align-items-center gap-2 mb-1"><span class="badge bg-primary">' + m.index + '</span>' +
        '<span class="flex-grow-1 text-muted small">Marker ' + m.index + ' — title &amp; text edited in D2L</span>' +
        '<button type="button" class="btn btn-sm btn-danger hotspot-remove" data-index="' + m.index + '">\u2212</button></div>';
    }).join('');
  }
  function makeDraggable(rec) {
    var dragging = false;
    rec.el.addEventListener('pointerdown', function (e) { dragging = true; rec.el.setPointerCapture(e.pointerId); e.preventDefault(); });
    rec.el.addEventListener('pointermove', function (e) {
      if (!dragging) return;
      var p = pct(e.clientX, e.clientY);
      rec.x = p.x; rec.y = p.y; rec.el.style.left = p.x + '%'; rec.el.style.top = p.y + '%';
    });
    rec.el.addEventListener('pointerup', function (e) { dragging = false; rec.el.releasePointerCapture(e.pointerId); });
  }
  function addMarker(x, y) {
    seq++;
    var b = document.createElement('button');
    b.type = 'button'; b.className = 'hotspot-marker'; b.dataset.index = String(seq);
    b.style.left = x + '%'; b.style.top = y + '%'; b.innerHTML = '<span>' + seq + '</span>';
    stage.appendChild(b);
    var rec = { el: b, index: seq, x: x, y: y };
    markers.push(rec); makeDraggable(rec); renderList();
  }
  stage.addEventListener('click', function (e) {
    if (e.target.closest('.hotspot-marker')) return;
    if (!aspect) return;
    var p = pct(e.clientX, e.clientY); addMarker(p.x, p.y);
  });
  builder.addEventListener('click', function (e) {
    var rem = e.target.closest('.hotspot-remove'); if (!rem) return;
    var idx = rem.dataset.index;
    markers = markers.filter(function (m) { if (String(m.index) === idx) { m.el.remove(); return false; } return true; });
    renderList();
  });

  function gen() {
    var root = generateUniqueId('hotspot');
    var ar = aspect || '1200 / 800', dims = ar.split('/').map(function (s) { return s.trim(); });
    var ph = 'https://placehold.co/' + dims[0] + 'x' + dims[1] + '?text=Paste+your+image+here';
    var markHtml = markers.map(function (m) {
      return '    <button class="hotspot-marker" style="left:' + m.x.toFixed(1) + '%;top:' + m.y.toFixed(1) + '%;" data-index="' + m.index + '" type="button" aria-label="Marker ' + m.index + '" aria-expanded="false"><span>' + m.index + '</span></button>';
    }).join('\n');
    var panelHtml = markers.map(function (m) {
      return (
'    <div class="hotspot-panel" data-index="' + m.index + '" contenteditable="false">\n' +
'      <h3 contenteditable="false"><span contenteditable="true">Marker ' + m.index + ' title</span></h3>\n' +
'    <div contenteditable="true">\n' +
'      <p>Marker ' + m.index + ' description.</p>\n' +
'    </div></div>'
      );
    }).join('\n');
    return (
'<div class="hotspot" id="' + root + '" contenteditable="false">\n' +
'  <p class="kc-instructions" contenteditable="true">Select a marker to learn more.</p>\n' +
'  <div class="hotspot-stage" style="aspect-ratio: ' + ar + ';">\n' +
'    <!-- Replace the placeholder with your image (same aspect ratio); markers stay aligned. -->\n' +
'    <div class="hotspot-image-wrap" contenteditable="true"><img class="hotspot-image" src="' + ph + '" alt="Describe the image" data-d2l-editor-default-img-style="true"></div>\n' +
markHtml + '\n' +
'  </div>\n' +
'  <div class="hotspot-overlay">\n' +
'    <div class="hotspot-overlay-card">\n' +
'      <button class="hotspot-close" type="button" aria-label="Close"><i class="bi bi-x-lg"></i></button>\n' +
'      <div class="hotspot-nav">\n' +
'        <button class="hotspot-prev" type="button" aria-label="Previous"><i class="bi bi-chevron-left"></i></button>\n' +
'        <button class="hotspot-next" type="button" aria-label="Next"><i class="bi bi-chevron-right"></i></button>\n' +
'      </div>\n' +
'      <div class="hotspot-panels">\n' + panelHtml + '\n      </div>\n' +
'    </div>\n' +
'  </div>\n' +
'</div>'
    );
  }
  wireKcCopy(section, gen);
}



/* trailing init for the two new sections */
(function () {
  function go() { initializeTimelineSection(); initializeHotspotSection(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', go);
  else go();
})();



/* ── Knowledge checks: Word Bank (drag the words) ──────────────── */
function initializeWordbankSection() {
  var builder = document.getElementById('wordbankBuilder');
  if (!builder) return;
  var tool = builder.closest('.kc-tool');
  function gen() {
    var root = generateUniqueId('wordbank');
    return (
'<div class="wordbank" id="' + root + '" contenteditable="false">\n' +
'  <p class="kc-instructions" contenteditable="true">Select a word, then select a blank to place it. Select a placed word to return it.</p>\n' +
'  <div class="wordbank-body" contenteditable="true">\n' +
'    <p>Mark each blank with double square brackets, and add distractor words with a plus, e.g. The [[mitochondria]] is the [[powerhouse]] of the cell. [[+nucleus]] [[+ribosome]]</p>\n' +
'  </div>\n' +
'  <div class="wordbank-bank" contenteditable="false"></div>\n' +
'  <div class="kc-feedback" data-when="correct" contenteditable="true"></div>\n' +
'  <div class="kc-feedback" data-when="incorrect" contenteditable="true"></div>\n' +
'  <div class="kc-controls" contenteditable="false">\n' +
'    <button class="kc-check btn btn-primary" type="button">Check</button>\n' +
'    <button class="kc-reset btn btn-secondary" type="button">Reset</button>\n' +
'    <p class="kc-status" aria-live="polite"></p>\n' +
'  </div>\n' +
'</div>'
    );
  }
  wireKcCopy(tool, gen);
}

(function () {
  function go() { initializeWordbankSection(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', go);
  else go();
})();

// Load saved colors from localStorage or set defaults
function loadSavedColors() {
  const savedColors = JSON.parse(localStorage.getItem('selectedThemeColors')) || {
    primary: 'navy',
    secondary: 'purple',
    tertiary: 'gold'
  };
  
  colorSelectors.primary.value = savedColors.primary;
  colorSelectors.secondary.value = savedColors.secondary;
  colorSelectors.tertiary.value = savedColors.tertiary;
}

// Save colors to localStorage
function saveColors() {
  const colors = {
    primary: colorSelectors.primary.value,
    secondary: colorSelectors.secondary.value,
    tertiary: colorSelectors.tertiary.value
  };
  localStorage.setItem('selectedThemeColors', JSON.stringify(colors));
}

// Generate template with selected colors
function generateTemplate() {
  const primaryColor = colorSelectors.primary.value;
  const secondaryColor = colorSelectors.secondary.value;
  const tertiaryColor = colorSelectors.tertiary.value;
  
  // Get text colors for selected colors
  const primaryText = textColorMap[primaryColor];
  const secondaryText = textColorMap[secondaryColor];
  const tertiaryText = textColorMap[tertiaryColor];
  
  return `<!DOCTYPE html>
<html lang="en"><head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Basic Page</title>
  <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="/shared/HTML-Template-Library/HTML-Templates-RCPI/rcpi_template/01_layout_templates/../../../Templates2025/bootstrap.css">
    <script defer="" src="/shared/HTML-Template-Library/HTML-Templates-RCPI/rcpi_template/01_layout_templates/../../../Templates2025/bootstrap.bundle.js"></script> 
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <link rel="stylesheet" href="/shared/HTML-Template-Library/HTML-Templates-RCPI/rcpi_template/01_layout_templates/../../../Templates2025/health-icons.css">
  <!-- Material Symbols (newest Google icons) -->
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet">

<!-- Material Icons (classic Google icons) -->
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

<!-- HugeIcons Free -->
<link rel="stylesheet" href="https://cdn.hugeicons.com/font/hgi-stroke-rounded.css">
  <style>
    :root {
    --bs-primary: var(--bs-${primaryColor}); 
    --bs-secondary: var(--bs-${secondaryColor});
    --bs-tertiary: var(--bs-${tertiaryColor});
    --bs-primary-text: ${primaryText};
    --bs-secondary-text: ${secondaryText};
    --bs-tertiary-text: ${tertiaryText};
  }
  </style>
</head>
<body>
<div class="container">
<header contenteditable="false">
<div class="header-image-wrapper decorative" contenteditable="true"><img class="decorative" src="/shared/HTML-Template-Library/HTML-Templates-RCPI/rcpi_template/01_layout_templates/../../../../banners/close-up-view-of-female-doctor-in-uniform-and-with-2025-03-18-21-29-57-utc%20(Custom).jpg" alt="" title="" data-d2l-editor-default-img-style="true" style="max-width: 100%;"></div>
<div class="header-text-primary">
<h1 contenteditable="false"><span contenteditable="true">Title </span></h1>
</div>
</header>
${Array(20).fill('<div class="row wysiwyg-mode" contenteditable="false"><div class="deletion-guard" contenteditable="true"></div><div class="editable-row-content wysiwyg-mode" contenteditable="true"></div><div class="deletion-guard" contenteditable="true"></div></div>').join('\n')}
</div></body></html>`;
}

// Generate just the CSS style content
function generateStyleContent() {
  const primaryColor = colorSelectors.primary.value;
  const secondaryColor = colorSelectors.secondary.value;
  const tertiaryColor = colorSelectors.tertiary.value;
  
  // Get text colors for selected colors
  const primaryText = textColorMap[primaryColor];
  const secondaryText = textColorMap[secondaryColor];
  const tertiaryText = textColorMap[tertiaryColor];
  
  return `  --bs-primary: var(--bs-${primaryColor}); 
  --bs-secondary: var(--bs-${secondaryColor});
  --bs-tertiary: var(--bs-${tertiaryColor});
  --bs-primary-text: ${primaryText};
  --bs-secondary-text: ${secondaryText};
  --bs-tertiary-text: ${tertiaryText};`;
}

// Copy template to clipboard
function copyTemplate() {
  const template = generateTemplate();
  
  navigator.clipboard.writeText(template)
    .then(() => {
      showToast("Color template copied to clipboard", 'success');
      saveColors(); // Save colors when copying
      
      // Close the offcanvas
      const offcanvas = bootstrap.Offcanvas.getInstance(
        document.getElementById('colorSelectorOffcanvas')
      );
      if (offcanvas) {
        offcanvas.hide();
      }
    })
    .catch((err) => {
      console.error('Copy failed:', err);
      showToast("Failed to copy template", 'error');
    });
}

// Copy just the style content to clipboard
function copyStyleOnly() {
  const styleContent = generateStyleContent();
  
  navigator.clipboard.writeText(styleContent)
    .then(() => {
      showToast("Style content copied to clipboard", 'success');
      saveColors(); // Save colors when copying
      
      // Close the offcanvas
      const offcanvas = bootstrap.Offcanvas.getInstance(
        document.getElementById('colorSelectorOffcanvas')
      );
      if (offcanvas) {
        offcanvas.hide();
      }
    })
    .catch((err) => {
      console.error('Copy failed:', err);
      showToast("Failed to copy style content", 'error');
    });
}


// Icon selector state

// Initialize icon selector
function initializeIconSelector() {
    setupLibraryTabs();
    setupColorButtons();
    setupFilterInput();
    setupRandomButton();
    loadLibrary('bootstrap'); // Back to loading just bootstrap initially
}

// Setup library tab functionality
function setupLibraryTabs() {
    const libraryButtons = document.querySelectorAll('[data-library]');
    
    libraryButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Remove active class from all buttons
            libraryButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            e.target.classList.add('active');
            
            // Load the selected library
            const library = e.target.dataset.library;
            loadLibrary(library);
        });
    });
}

// Load icons from selected library - UPDATED to show all icons
function loadLibrary(library) {
    currentLibrary = library;
    let icons = [];
    
    switch (library) {
        case 'bootstrap':
            icons = bootstrapIcons;
            break;
        case 'healthicons':
            icons = healthIcons;
            break;
        case 'material-icons':
            icons = materialIcons;
            break;
        case 'material-symbols':
            icons = materialSymbols;
            break;
        case 'hugeicons':
            icons = hugeIconsFree;
            break;
    }
    
    // Show icons from selected library only
    filteredIcons = [...icons];
    renderIcons(filteredIcons); // Use renderIcons, not renderAllIcons
    updateIconCount(); // Use updateIconCount, not updateIconCountForAll
    
    // Clear the filter input
    const filterInput = document.getElementById('iconFilter');
    if (filterInput) {
        filterInput.value = '';
    }
}


// Render icons in the grid
// Updated renderIcons function
function renderIcons(icons) {
    const iconGrid = document.getElementById('iconGrid');
    iconGrid.innerHTML = '';
    
    icons.forEach(iconName => {
        const button = document.createElement('button');
        button.className = 'btn mb-1 btn-outline-secondary icon-option';
        button.dataset.source = currentLibrary;
        button.dataset.icon = iconName;
        
        // Create appropriate icon element based on library
        const iconElement = createIconElement(iconName, currentLibrary);
        
        // Apply current color
        iconElement.style.color = `var(--bs-${currentColor}-dark)`;
        
        button.appendChild(iconElement);
        
        // Add click handler
        button.addEventListener('click', () => {
            handleIconSelection(iconName, currentLibrary);
        });
        
        iconGrid.appendChild(button);
    });
}

// Updated renderAllIcons function
function renderAllIcons(icons) {
    const iconGrid = document.getElementById('iconGrid');
    iconGrid.innerHTML = '';
    
    icons.forEach(iconData => {
        const button = document.createElement('button');
        button.className = 'btn mb-1 btn-outline-secondary icon-option';
        button.dataset.source = iconData.library;
        button.dataset.icon = iconData.name;
        
        // Create icon element
        const iconElement = createIconElement(iconData.name, iconData.library);
        
        // Apply current color
        iconElement.style.color = `var(--bs-${currentColor}-dark)`;
        
        button.appendChild(iconElement);
        
        // Add click handler
        button.addEventListener('click', () => {
            handleIconSelection(iconData.name, iconData.library);
        });
        
        iconGrid.appendChild(button);
    });
}


// Create icon element based on library type
// Updated createIconElement function
function createIconElement(iconName, library) {
    let element;
    
    switch (library) {
        case 'material-symbols':
            element = document.createElement('i'); // Changed from span to i
            element.className = 'material-symbols-outlined';
            element.textContent = iconName;
            break;
            
        case 'material-icons':
            element = document.createElement('i'); // Changed from span to i
            element.className = 'material-icons';
            element.textContent = iconName;
            break;
            
        case 'hugeicons':
            element = document.createElement('i');
            element.className = `hgi-stroke hgi-${iconName}`;
            break;
            
        case 'healthicons':
            element = document.createElement('i');
            element.className = `hi hi-${iconName}`;
            break;
            
        default: // bootstrap
            element = document.createElement('i');
            element.className = `bi bi-${iconName}`;
            break;
    }
    
    return element;
}


// Setup filter functionality
// Updated setupFilterInput to handle both text filter and hide filled toggle
function setupFilterInput() {
    const filterInput = document.getElementById('iconFilter');
    const iconFillToggle = document.getElementById('iconFillToggle');
    
    function performFiltering() {
        const filterText = filterInput.value.toLowerCase().trim();
        const hideFilled = iconFillToggle.checked;
        
        if (filterText === '' && !hideFilled) {
            // Show current library when both filter is empty and toggle is off
            loadLibrary(currentLibrary);
        } else {
            // Filter across ALL libraries when there's search text OR hide filled is on
            const allIcons = [
                ...bootstrapIcons.map(icon => ({name: icon, library: 'bootstrap'})),
                ...healthIcons.map(icon => ({name: icon, library: 'healthicons'})),
                ...materialIcons.map(icon => ({name: icon, library: 'material-icons'})),
                ...materialSymbols.map(icon => ({name: icon, library: 'material-symbols'})),
                ...hugeIconsFree.map(icon => ({name: icon, library: 'hugeicons'}))
            ];
            
            let filtered = allIcons;
            
            // Apply text filter if there's search text
            if (filterText !== '') {
                filtered = filtered.filter(iconData => 
                    iconData.name.toLowerCase().includes(filterText) ||
                    iconData.library.toLowerCase().includes(filterText)
                );
            }
            
            // Apply filled icon filter if toggle is checked
            if (hideFilled) {
                filtered = filtered.filter(iconData => 
                    !iconData.name.toLowerCase().includes('fill') &&
                    !iconData.name.toLowerCase().includes('filled')
                );
            }
            
            filteredIcons = filtered;
            
            if (filterText !== '') {
                // Multi-library results when searching
                renderAllIcons(filteredIcons);
                updateIconCountForAll();
            } else {
                // Single library results when only using hide filled toggle
                const currentLibraryFiltered = filtered.filter(iconData => 
                    iconData.library === currentLibrary
                );
                filteredIcons = currentLibraryFiltered.map(iconData => iconData.name);
                renderIcons(filteredIcons);
                updateIconCount();
            }
        }
    }
    
    // Add event listeners
    filterInput.addEventListener('input', performFiltering);
    iconFillToggle.addEventListener('change', performFiltering);
}

// Get current library icons
function getCurrentLibraryIcons() {
    switch (currentLibrary) {
        case 'bootstrap': return bootstrapIcons;
        case 'healthicons': return healthIcons;
        case 'material-icons': return materialIcons;
        case 'material-symbols': return materialSymbols;
        case 'hugeicons': return hugeIconsFree;
        default: return [];
    }
}

// Setup random icons functionality
function setupRandomButton() {
    const randomBtn = document.getElementById('randomIconsBtn');
    
    randomBtn.addEventListener('click', () => {
        const allIcons = getCurrentLibraryIcons();
        const randomIcons = [];
        
        // Get 10 random icons
        for (let i = 0; i < Math.min(10, allIcons.length); i++) {
            const randomIndex = Math.floor(Math.random() * allIcons.length);
            const randomIcon = allIcons[randomIndex];
            
            if (!randomIcons.includes(randomIcon)) {
                randomIcons.push(randomIcon);
            }
        }
        
        filteredIcons = randomIcons;
        renderIcons(filteredIcons);
        updateIconCount();
    });
}

// Update icon count display
function updateIconCount() {
    const countElement = document.getElementById('iconCount');
    const total = getCurrentLibraryIcons().length;
    const shown = filteredIcons.length;
    
    countElement.textContent = `Showing ${shown} of ${total} icons`;
}

function updateIconCountForAll() {
    const countElement = document.getElementById('iconCount');
    const totalIcons = bootstrapIcons.length + healthIcons.length + materialIcons.length + materialSymbols.length + hugeIconsFree.length;
    const shown = filteredIcons.length;
    
    countElement.textContent = `Showing ${shown} of ${totalIcons} icons from all libraries`;
}

// Setup color button functionality (existing)
// Updated setupColorButtons function
function setupColorButtons() {
    const colorButtons = document.querySelectorAll('[data-color]');
    
    colorButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Remove active class from all color buttons
            colorButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            e.target.classList.add('active');
            
            // Update current color
            currentColor = e.target.dataset.color;
            
            // Update colors of currently visible icons in the selector
            updateIconColors();
        });
    });
    
    // Set default active state (make Primary active by default)
    const primaryButton = document.querySelector('[data-color="primary"]');
    if (primaryButton) {
        primaryButton.classList.add('active');
        currentColor = 'primary';
    }
}

// New function to update icon colors in the selector
function updateIconColors() {
    const iconGrid = document.getElementById('iconGrid');
    const iconButtons = iconGrid.querySelectorAll('button.icon-option i');
    
    iconButtons.forEach(icon => {
        icon.style.color = `var(--bs-${currentColor}-dark)`;
    });
}


// Enhanced handleIconSelection function
function handleIconSelection(iconName, iconSource) {
    let iconParent = null;

    // Find the editing target based on currentEditTarget
    if (currentEditTarget === "column") {
        iconParent = document.querySelector(".icon-container.editing .d-flex");
    } else if (currentEditTarget === "accordion") {
        iconParent = document.querySelector(".accordion-button.editing");
    } else if (currentEditTarget === "list") {
        iconParent = document.querySelector("li.editing");
    } else if (currentEditTarget === "card") {
        iconParent = document.querySelector(".card-with-icon.editing .icon-column");
    }

    if (!iconParent) return;

    const componentId = iconParent.closest("[data-component-id]")?.dataset.componentId;
    if (componentId) {
        // Normalize to a canonical type so exported code (generateComponentCode)
        // can render the correct markup for every library, not just Bootstrap.
        let iconType;
        if (iconSource === "healthicons" || iconName.startsWith("filled-") || iconName.startsWith("outline-")) {
            iconType = "healthicons";
        } else if (iconSource === "material-symbols" || iconSource === "material-icons") {
            iconType = iconSource;
        } else if (iconSource === "hugeicons") {
            iconType = "hugeicons";
        } else {
            iconType = "bootstrap";
        }

        iconStates.set(componentId, {
            type: iconType,
            icon: iconName,
            color: currentColor,
        });
    }

    // Remove existing icons
    const existingIcons = iconParent.querySelectorAll("i, span.material-symbols-outlined, span.material-icons");
    existingIcons.forEach((icon) => icon.remove());

    // Create new icon element
    const iconElement = createIconElement(iconName, iconSource);
    
    // Apply color styling
    if (currentEditTarget !== "accordion") {
        iconElement.style.color = `var(--bs-${currentColor}-dark)`;
    } else if (currentEditTarget === "card") {
        iconElement.style.color = iconParent.closest(".card-white")
            ? "var(--bs-tertiary-dark)"
            : "white";
    }

    iconParent.prepend(iconElement);

    // Cleanup
    document.querySelectorAll(".editing").forEach((el) => el.classList.remove("editing"));
    bootstrap.Offcanvas.getInstance(document.getElementById("iconSelectorOffcanvas"))?.hide();
}


function buildQuickSelectList() {
  console.log('Building quick select list...');
  const container = document.getElementById('quickSelectList');
  if (!container) {
    console.error('Quick select list container not found');
    return;
  }
  container.innerHTML = '';

  container.style.padding = '0';
  container.style.fontSize = '0.85rem';

  const components = document.querySelectorAll('.component-section[data-name]');
  console.log(`Found ${components.length} components`);

  components.forEach((section, index) => {
    const sectionName = section.dataset.name || 'Unnamed Component';
    console.log(`Processing component ${index + 1}: ${sectionName}`);

    // Find add/remove buttons
    const addBtn = section.querySelector('.add-item, .add-row, .add-column');
    const removeBtn = section.querySelector('.remove-item, .remove-row, .remove-column');

    // Skip +/- for "Text and Lists" except Icon Lists
    const isTextAndLists = sectionName.toLowerCase().includes('text and lists') || sectionName.toLowerCase().includes('text columns');
    const isIconLists = sectionName.toLowerCase().includes('icon list');

    // Get all copy buttons for this section
    const allCopyButtons = Array.from(section.querySelectorAll('button[class*="copy-"]'));
    const copyButtons = allCopyButtons.filter(btn => {
      const text = btn.textContent.trim().toLowerCase();
      return !text.includes('code');
    });
    console.log(`Found ${copyButtons.length} non-code copy buttons in ${sectionName}`);


    // Count items only if interactive
    let itemCount = 0;
    if (addBtn && removeBtn) {
      if (section.querySelectorAll('.accordion-item').length) {
        itemCount = section.querySelectorAll('.accordion-item').length;
      } else if (section.querySelectorAll('.carousel-item').length) {
        itemCount = section.querySelectorAll('.carousel-item').length;
      } else if (section.querySelectorAll('.flip-card-wrapper').length) {
        itemCount = section.querySelectorAll('.flip-card-wrapper').length;
      } else if (section.querySelectorAll('ul.icon-list li').length) {
        itemCount = section.querySelectorAll('ul.icon-list li').length;
      } else if (section.querySelectorAll('tbody tr').length) {
        itemCount = section.querySelectorAll('tbody tr').length;
      } else if (section.querySelectorAll('.text-carousel .carousel-item').length) {
        itemCount = section.querySelectorAll('.text-carousel .carousel-item').length;
      } else if (section.querySelectorAll('.image-carousel .carousel-item').length) {
        itemCount = section.querySelectorAll('.image-carousel .carousel-item').length;
      } else {
        itemCount = section.querySelectorAll('.wysiwyg-mode').length;
      }
    }

    copyButtons.forEach((copyBtnElem, copyIndex) => {
      const itemDiv = document.createElement('div');
      itemDiv.style.display = 'flex';
      itemDiv.style.justifyContent = 'space-between';
      itemDiv.style.alignItems = 'center';
      itemDiv.style.padding = '2px 4px';
      itemDiv.style.margin = '0';

      // Button label
      let btnLabel = copyBtnElem.textContent.trim();
      if (!btnLabel) btnLabel = `Copy Button ${copyIndex + 1}`;

      // Name span with item count only if interactive and not Text and Lists except Icon Lists
      const nameSpan = document.createElement('span');
      nameSpan.style.flex = '1';
      nameSpan.style.fontWeight = '600';
      nameSpan.style.minWidth = '140px';
      nameSpan.style.marginRight = '0.5rem';

      let displayName = sectionName + ' - ' + btnLabel;
      if (addBtn && removeBtn && (!isTextAndLists || isIconLists)) {
        displayName += ` (Items: ${itemCount})`;
      }
      nameSpan.textContent = displayName;

      // Copy button
      const copyBtn = document.createElement('button');
      copyBtn.className = 'btn btn-sm btn-primary';
      copyBtn.textContent = 'Copy';
      copyBtn.style.marginRight = '0.5rem';
      copyBtn.style.marginBottom = '0';
      copyBtn.addEventListener('click', () => {
        console.log(`Copy clicked: ${displayName}`);
        copyBtnElem.click();
      });

      // + and - buttons conditionally
      let plusBtn = null, minusBtn = null;
      if (addBtn && removeBtn && (!isTextAndLists || isIconLists)) {
        plusBtn = document.createElement('button');
        plusBtn.className = 'btn btn-sm btn-success';
        plusBtn.textContent = '+';
        plusBtn.style.marginRight = '0.5rem';
        plusBtn.style.marginBottom = '0';
        plusBtn.addEventListener('click', () => {
          console.log(`Add clicked for ${sectionName}`);
          addBtn.click();
          setTimeout(buildQuickSelectList, 300);
        });

        minusBtn = document.createElement('button');
        minusBtn.className = 'btn btn-sm btn-danger';
        minusBtn.textContent = '-';
        minusBtn.style.marginRight = '0.5rem';
        minusBtn.style.marginBottom = '0';
        minusBtn.addEventListener('click', () => {
          console.log(`Remove clicked for ${sectionName}`);
          removeBtn.click();
          setTimeout(buildQuickSelectList, 300);
        });
      }

      // Append all buttons
      itemDiv.appendChild(nameSpan);
      if (plusBtn) itemDiv.appendChild(plusBtn);
      if (minusBtn) itemDiv.appendChild(minusBtn);
      itemDiv.appendChild(copyBtn);

      container.appendChild(itemDiv);
    });
  });
}

// Builds one combined HTML blob containing every component section on the
// page (each interactive/multi-item component bumped up to 3 items first,
// so first-item-vs-rest inconsistencies are reproducible), and copies it in
// one WYSIWYG paste so it can be dropped into a fresh test page. Mirrors the
// same name -> generate*Code branching each section's own copy-wysiwyg
// button already uses (see initializeComponentSection's click handler).
function copyOneOfEverything() {
  const sections = document.querySelectorAll('.component-section[data-name]');
  const snippets = [];

  sections.forEach((section) => {
    const name = section.dataset.name;
    const container = section.querySelector('.component-container');
    if (!container) return;

    const addBtn = section.querySelector('.add-item, .add-row, .add-column');
    const removeBtn = section.querySelector('.remove-item, .remove-row, .remove-column');

    if (addBtn && removeBtn) {
      let itemCount;
      if (container.querySelectorAll('.accordion-item').length) itemCount = container.querySelectorAll('.accordion-item').length;
      else if (container.querySelectorAll('.carousel-item').length) itemCount = container.querySelectorAll('.carousel-item').length;
      else if (container.querySelectorAll('.flip-card-wrapper').length) itemCount = container.querySelectorAll('.flip-card-wrapper').length;
      else if (container.querySelectorAll('ul.icon-list li').length) itemCount = container.querySelectorAll('ul.icon-list li').length;
      else if (container.querySelectorAll('tbody tr').length) itemCount = container.querySelectorAll('tbody tr').length;
      else itemCount = container.children.length;

      let guard = 0;
      while (itemCount < 3 && guard < 10) {
        addBtn.click();
        itemCount++;
        guard++;
      }
    }

    let code = null;
    try {
      if (name === "Reveal Tables") {
        code = generateRevealTableCode(container);
      } else if (name === "Click and Reveal") {
        code = generateRevealCode(container);
      } else if (name === "Tabs") {
        const contentContainer = container.parentElement.querySelector(".tab-content");
        code = contentContainer ? generateTabsCode(container, contentContainer) : generateComponentCode(container, contentContainer, name);
      } else if (name === "Vertical Tabs") {
        const verticalTabsContainer = container.closest(".vertical-tabs-wrapper");
        const contentContainer = verticalTabsContainer ? verticalTabsContainer.querySelector(".tab-content") : null;
        code = contentContainer ? generateVerticalTabsCode(container, contentContainer) : generateComponentCode(container, contentContainer, name);
      } else if (name === "Image Carousels") {
        code = generateCarouselCode(container);
      } else if (name === "Text Carousels") {
        code = generateTextCarouselCode(container);
      } else if (name === "Accordions") {
        code = generateAccordionCode(container);
      } else if (name === "Numbered Accordions") {
        code = generateNumberedAccordionCode(container);
      } else if (name === "Icon Accordions") {
        code = generateIconAccordionCode(container);
      } else if (name === "Flipcards") {
        code = generateFlipCardCode(container);
      } else {
        code = generateComponentCode(container, null, name);
      }
    } catch (err) {
      console.error(`copyOneOfEverything: failed to generate code for "${name}"`, err);
      return;
    }

    if (code) {
      snippets.push(`<div class="row wysiwyg-mode" contenteditable="false">
<div class="deletion-guard" contenteditable="true"></div>
<div class="editable-row-content wysiwyg-mode" contenteditable="true">
<!-- ===== ${name} ===== -->
${code}
</div>
<div class="deletion-guard" contenteditable="true"></div>
</div>`);
    }
  });

  const combined = snippets.join('\n\n');
  universalCopy(combined, true, true);
  showToast(`Copied ${snippets.length} components for a test page`, 'success');
}

 // Function to toggle color selector visibility

  function toggleColorSelector(show) {
    const colorSelectorContainer = document.querySelector(
      '.btn-group[role="group"]'
    ); // Adjust selector as needed
    if (colorSelectorContainer) {
      colorSelectorContainer.style.display = show ? "flex" : "none";
    }
  }

  // ── Receive image-search requests from the Edit Toolkit ──────────────────────
// The toolkit posts {type:'bb-image-search', query} when you Alt+right-click
// selected text → "Block-builder picker". We open the image picker offcanvas,
// fill the search box, run the search, and post an acknowledgment back so the
// toolkit can show an accurate success toast.
window.addEventListener('message', function (e) {
  var data = e.data;
  if (!data || data.type !== 'bb-image-search' || !data.query) return;

  var ok = false;
  try {
    // 1. Open the image-picker offcanvas
    var oc = document.getElementById('imagePickerOffcanvas');
    if (oc && window.bootstrap && bootstrap.Offcanvas) {
      bootstrap.Offcanvas.getOrCreateInstance(oc).show();
    }

    // 2. Fill the search box
    var input = document.getElementById('searchInput');
    if (input) input.value = data.query;

    // 3. Run the search (defined above in utils.js)
    if (typeof searchAllApis === 'function') {
      searchAllApis(data.query);
      ok = true;
    } else {
      console.warn('[BB] searchAllApis not found');
    }
  } catch (err) {
    console.error('[BB] image-search handler failed:', err);
  }

  // 4. Acknowledge back to whoever sent the request (the toolkit). e.source is
  //    the posting window; reply to it so the toolkit knows it landed.
  try {
    if (e.source && e.source.postMessage) {
      e.source.postMessage({ type: 'bb-image-search-ack', query: data.query, ok: ok }, '*');
    }
  } catch (err) {}
});
/* ── Charts (Chart.js) ──────────────────────────────────────────── */
var CHART_DEFAULT_COLORS = ['#0d6efd','#dc3545','#198754','#ffc107','#6f42c1','#20c997','#fd7e14','#6610f2'];

function initializeChartSection() {
  var section = document.querySelector('.component-section[data-name="Charts"]');
  if (!section) return;
  var typeSelect = section.querySelector('.chart-type-select');
  var labelsInput = section.querySelector('.chart-labels-input');
  var datasetsList = section.querySelector('.chart-datasets-list');
  var canvas = section.querySelector('.chart-preview-canvas');
  var chartInstance = null;

  function needsXY() {
    var t = typeSelect.value;
    return t === 'bubble' || t === 'scatter';
  }

  function datasetRows() {
    return [].slice.call(datasetsList.querySelectorAll('.chart-dataset-row'));
  }

  function makeDatasetRow(index) {
    var row = document.createElement('div');
    row.className = 'chart-dataset-row d-flex gap-2 align-items-center mb-2 flex-wrap';
    var color = CHART_DEFAULT_COLORS[index % CHART_DEFAULT_COLORS.length];
    row.innerHTML =
      '<input type="text" class="form-control form-control-sm chart-dataset-label" style="max-width:140px" placeholder="Dataset label" value="Dataset ' + (index + 1) + '">' +
      '<input type="color" class="form-control form-control-sm form-control-color chart-dataset-color" value="' + color + '">' +
      '<input type="text" class="form-control form-control-sm chart-dataset-values" placeholder="Values (comma-separated, or x:y for bubble/scatter)" value="10, 20, 15">';
    return row;
  }

  function buildChartConfig() {
    var type = typeSelect.value;
    var xy = needsXY();
    var labels = labelsInput.value.split(',').map(function (l) { return l.trim(); }).filter(Boolean);
    var datasets = datasetRows().map(function (row) {
      var label = row.querySelector('.chart-dataset-label').value.trim() || 'Dataset';
      var color = row.querySelector('.chart-dataset-color').value;
      var valuesStr = row.querySelector('.chart-dataset-values').value;
      var data;
      if (xy) {
        data = valuesStr.split(',').map(function (pair) {
          var parts = pair.trim().split(':');
          return { x: parseFloat(parts[0]), y: parseFloat(parts[1]) };
        }).filter(function (p) { return !isNaN(p.x) && !isNaN(p.y); });
      } else {
        data = valuesStr.split(',').map(function (v) { return parseFloat(v.trim()); }).filter(function (n) { return !isNaN(n); });
      }
      return {
        label: label,
        data: data,
        backgroundColor: (type === 'pie' || type === 'doughnut' || type === 'polarArea')
          ? data.map(function (_, i) { return CHART_DEFAULT_COLORS[i % CHART_DEFAULT_COLORS.length]; })
          : color,
        borderColor: color,
        borderWidth: 1
      };
    });
    var chartData = { datasets: datasets };
    if (!xy) chartData.labels = labels;
    return { type: type, data: chartData, options: { responsive: true } };
  }

  function updatePreview() {
    if (typeof Chart === 'undefined' || !canvas) return;
    var config = buildChartConfig();
    if (chartInstance) chartInstance.destroy();
    chartInstance = new Chart(canvas.getContext('2d'), config);
  }

  function generateChartCode() {
    var config = buildChartConfig();
    var id = 'chart-' + Date.now().toString(36) + '-' + Math.random().toString(36).substr(2, 6);
    var configJson = JSON.stringify(config).replace(/</g, '\\u003c');
    return (
      '<canvas id="' + id + '" data-bb-chart="1"></canvas>\n' +
      '<script>\n' +
      '(function(){\n' +
      '  function draw(){ new Chart(document.getElementById("' + id + '").getContext("2d"), ' + configJson + '); }\n' +
      '  if (window.Chart) { draw(); } else { window.addEventListener("load", function(){ if (window.Chart) draw(); }); }\n' +
      '})();\n' +
      '</script>'
    );
  }

  while (datasetRows().length < 1) datasetsList.appendChild(makeDatasetRow(datasetRows().length));

  section.querySelector('.chart-add-dataset').addEventListener('click', function () {
    datasetsList.appendChild(makeDatasetRow(datasetRows().length));
    updatePreview();
  });
  section.querySelector('.chart-remove-dataset').addEventListener('click', function () {
    if (datasetRows().length > 1) datasetsList.lastElementChild.remove();
    updatePreview();
  });
  typeSelect.addEventListener('change', updatePreview);
  labelsInput.addEventListener('input', updatePreview);
  datasetsList.addEventListener('input', updatePreview);

  wireKcCopy(section, generateChartCode);
  updatePreview();
}