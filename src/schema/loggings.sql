CREATE TABLE `PROJECT-NAME.DATABASE-NAME.securityLog` (ip string,
    user_id string,
    context string,
    `group` string,
    action string,
    `data` string, 
    `date` string);

CREATE TABLE `PROJECT-NAME.DATABASE-NAME.debugLog` (
    `project` string,
    `namespace` string,
    `module` string,
    `action` string,
    `data` string, 
    `date` string);