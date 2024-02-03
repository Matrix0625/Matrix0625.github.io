<!DOCTYPE html>
<html>
<head>
    <title>Welcome to my website</title>
    <link rel="shortcut icon" href="cloudy.jpg">
    <meta charset="UTF-8">
    <style>
        #your-div-id {
            position: fixed;
            color: rgb(34, 217, 220);
            background-color: #40a6e6;
            text-shadow: 1px 3px 1px white;
            border: 6px solid black;
            width: 300px;
            left: 300px;
            top: 100px;
            font-size: 90px;
            font-family: Helvetica;
            text-align: right;
            z-index: 20;
            transition: background-color 0.3s ease; 
        }

        #your-div-id:hover {
            background-color: #003366; 
        }

        img {
            position: fixed;
            top: 0px;
            right: 0px;
            width: 1200px;
            opacity: .6;
            border-radius: 15px 50px 30px 5px;
            z-index: 15;
        }

        video {
            position: fixed;
            width: 30vw;
            top: 50vh; 
            left: 5vw;
            border-radius: 0px 100px 10px 0px;
            z-index: 10;
        }

        a {
            text-decoration: none;
        }

        a:link, a:visited {
            color: inherit;
        }

        a:hover {
            text-decoration: underline;
        }

        #cloud-image:hover {
            opacity: 1;
            transition: opacity 0.3s ease;
        }
    </style>
</head>
<body>
    <a href="https://google.com">
        <video loop controls id="cloud-video" src="videoplayback.mp4" type="video/mp4" alt="Cloud Video"></video>
    </a>
    <a href="https://www.bing.com/videos/riverview/relatedvideo?&q=clouds+in+the+sky&&mid=E45C019DFD1BB00B90CAE45C019DFD1BB00B90CA&&FORM=VRDGAR">
        <img id="cloud-image" src="cloud.jpg" alt="Cloud Image">
    </a>
    <div id="your-div-id">Welcome!</div>
</body>
</html>
