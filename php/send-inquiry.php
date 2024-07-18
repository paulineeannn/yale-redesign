<?php
    $conn = mysqli_connect('localhost', 'root', '', 'maindb', '3307');

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $name = $conn->real_escape_string($_POST["name"]);
        $email = $conn->real_escape_string($_POST["email"]);
        $contact = $conn->real_escape_string($_POST["contact"]);
        $message = $conn->real_escape_string($_POST["message"]);

        $query = "INSERT INTO soa_inquiries (name, email, contact, message) VALUES ('$name', '$email', '$contact', '$message')";

        if ($conn->query($query) === TRUE) {
            ?>
            <script>
                alert("Inquiry submitted successfully. Expect a response from us soon.");
                window.location.href = "../pages/contact.html#heading-inquiry";
            </script>
            <?php
        } else {
            ?>
            <script>
                alert("Error: <?php echo $query . "<br>" . $conn->error; ?>");
                window.location.href = "../pages/contact.html#heading-inquiry";
            </script>
            <?php
        }
    }

    $conn->close();
?>