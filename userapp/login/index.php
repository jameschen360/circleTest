<?php
    require '../config.php';
    require '../Slim/Slim.php';
    
    \Slim\Slim::registerAutoloader();
    $app = new \Slim\Slim;

    $app->post('/login','login'); /* User login Native */
    $app->post('/loginTokenCheck','loginTokenCheck');
    $app->post('/eventIdGetter','eventIdGetter');
    $app->post('/openGames','openGames');
    
    $app->run();   
    

    function loginTokenCheck() {
        $request = \Slim\Slim::getInstance()->request();
        $data = json_decode($request->getBody());

        $generated_id_from_user = $data->$data->generated_id;

        $token_from_user = $data->token;
        $systemToken = apiToken($generated_id_from_user);

        $mysqli = getDB();
        if ($mysqli) {
            if ($systemToken) {
                echo json_encode(array(
                    'isValid' => true
                )); 
            } else {
                echo json_encode(array(
                    'isValid' => false,
                    'token_from_user' => $token_from_user,
                    'systemToken' => $systemToken
                ));   
            }
        } else {
            echo json_encode(array(
                'error' => $mysqli->connection_errno
            ));    	
        }
    }

    function openGames() {
        $mysqli = getDB();
        $output = [];
        if ($mysqli) {
            $SQL = "SELECT * FROM games";
            $sql_query = $mysqli->query($SQL);
            while ($sql_result = $sql_query->fetch_assoc()) {
                $output[] = $sql_result;
            }
            echo json_encode(array(
                'isValid' => true,
                'output' => $output
            )); 
        } else {
            echo json_encode(array(
                'error' => $mysqli->connection_errno
            ));    	
        }
    }

    function eventIdGetter() {
        $request = \Slim\Slim::getInstance()->request();
        $data = json_decode($request->getBody());

        $generated_id_from_user = $data->data->generated_id;
        $systemToken = apiToken($generated_id_from_user);

        $mysqli = getDB();
        if ($mysqli) {
            if ($systemToken) {
                $SQL = "SELECT socketID FROM games WHERE user1='$generated_id_from_user'";
                $sql_query = $mysqli->query($SQL);
                $sql_numrows = $sql_query->num_rows;
                $date = date("Y-m-d H:i:s"); 

                if ($sql_numrows == 0) {
                    $eventID = random();
                    $SQL2 = "INSERT INTO games (socketID, user1, created_date) VALUES('$eventID', '$generated_id_from_user', '$date')";
                    $sql_query2 = $mysqli->query($SQL2);
                } else {
                    $sql_result = $sql_query->fetch_assoc();
                    $eventID = $sql_result['socketID'];
                }
                
                echo json_encode(array(
                    'isValid' => $generated_id_from_user,
                    'eventID' => $eventID,
                    'nums' => $sql_numrows
                ));    
            } else {
                echo json_encode(array(
                    'isValid' => false
                ));   
            }
        } else {
            echo json_encode(array(
                'error' => $mysqli->connection_errno
            ));    	
        }
    }

    function login() {
        $request = \Slim\Slim::getInstance()->request();
        $data = json_decode($request->getBody());

        $mysqli = getDB();
        if ($mysqli) {
            $password = hash('sha256',$data->password);
            $username = $data->username;
            $sql = "SELECT generated_id,first_name,last_name,email FROM users WHERE email='$username' AND pwd='$password'";
            $result = $mysqli->query($sql);

            if ($result->num_rows == 1) {
                $userData = $result->fetch_array();
                $mysqli->close();
                $user_id=$userData['generated_id'];
                $token = apiToken($user_id); 
                $userData->$token = $token;
                              
                echo json_encode(array(
                    'isValid' => true,
                    'userData' => $userData,
                    'token' => $token,
                    'user_id' => $user_id
                ));  
            } else {
                echo json_encode(array(
                    'isValid' => false,
                    'userData' => false,
                    'testpwd' => $password
                ));  
            }
        } else {
            echo json_encode(array(
                'error' => $mysqli->connection_errno
            ));    	
        }
    }


    // 
    // RANDOM NUMBER/CHARACTER GENERATOR
    // 

    function random() {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $charactersLength = strlen($characters);
        $randomString = '';
        for ($i = 0; $i < 25; $i++) {
            $randomString .= $characters[rand(0, $charactersLength - 1)];
        }
        return $randomString;
    }

?>
