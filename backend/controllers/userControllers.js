const { getUser, createUser, loginUser, updateEmail, updateUsername, updatePassword } = require("../services/userServices");
const { sendEmail } = require("../utils/sendMail");

const getUserController = async (req, res) => {
    try {
        const result = await getUser(req.user.id);
        res.send(result);
    } catch (error) {
        console.error("Error in User controller : ", error);
        res.status(500).send("Internal Sever Error");
    }
};

const updateEmailController = async (req, res) => {
    try {
        const newEmail = req.body.email;

        if (!newEmail) {
            return res.status(400).json({ message: "New email is missing" });
        }

        const updatedUser = await updateEmail(req.user.id, newEmail);

        return res.status(200).send(updatedUser);
    } catch (error) {
        console.error("Error in User controller : ", error);
        return res.status(400).send({ message: error.message });
    }
};

const updateUsernameController = async (req, res) => {
    try {
        const newUsername = req.body.username;

        if (!newUsername) {
            return res.status(400).json({ message: "New username is missing" });
        }

        const updatedUser = await updateUsername(req.user.id, newUsername);

        return res.status(200).send(updatedUser);
    } catch (error) {
        console.error("Error in User controller : ", error);
        return res.status(400).send({ message: error.message });
    }
};

const updatePasswordController = async (req, res) => {
    try {
        const newPassword = req.body.password;

        if (!newPassword) {
            return res.status(400).json({ message: "New password is missing" });
        }

        const updatedUser = await updatePassword(req.user.id, newPassword);

        return res.status(200).send(updatedUser);
    } catch (error) {
        console.error("Error in User controller : ", error);
        return res.status(400).send({ message: error.message });
    }
};

const createUserController = async (req, res) => {
    try {
        const {email, username, password} = req.body;

        if (!email || !username || !password) {
            return res.status(400).send("Missing required fields");
        }

        const result = await createUser({email, username, password});

        res.status(201).send(result);
    } catch (error) {
        console.error("Error in User controller : ", error);
        res.status(400).send({ message: error.message });
    }
};

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send("Missing credential");
        }

        const { token, user } = await loginUser({ email, password });

        sendEmail("mdelaserre@hotmail.fr", "hello", "mail envoye");

        res.status(200).json({ token, user });
    } catch (error) {
        console.error("Error in login controller : ", error.message);
        res.status(401).send({ message: error.message });
    }
};

module.exports = {
    getUserController,
    updateEmailController,
    updateUsernameController,
    updatePasswordController,
    createUserController,
    loginController,
};