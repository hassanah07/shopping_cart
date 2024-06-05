const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Users = require("../Modals/User");
const nodemailer = require("nodemailer");
const fetchUser = require("../middleware/fetchUser");
const Address = require("../Modals/Address");

router.post("/userRedirect", async (req, res) => {
  try {
    let user = await Users.findOne({ email: req.body.email });
    if (!user) {
      res.json({
        status: false,
        msg: "Redirecting to Registration Page"
      });
    } else {
      res.json({
        status: true,
        msg: "Redirecting to Login Page"
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ status: false, msg: "Internal Server Error", error });
  }
});
router.post("/regn", async (req, res) => {
  try {
    let user = await Users.findOne({ email: req.body.email });
    if (!user) {
      let user = await Users.findOne({ mobile: req.body.mobile });
      if (!user) {
        const randPassword = (Math.random() + 1)
          .toString(36)
          .substring(3)
          .toUpperCase();
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(randPassword, salt);
        const profileId = Math.floor(Math.random() * 20000000);
        user = await Users.create({
          profileId: profileId,
          name: req.body.name,
          email: req.body.email,
          mobile: req.body.mobile,
          password: hashedPassword
        });
        try {
          const transporter = nodemailer.createTransport({
            host: "smtp.forwardemail.net",
            port: 465,
            secure: true,
            service: "gmail",
            auth: {
              // user: userName,
              // pass: password,
              user: process.env.MAILER_USERID,
              pass: process.env.MAILER_PASSWORD
            }
          });
          async function main() {
            const info = await transporter.sendMail({
              from: '"Server Mail"anowarulah07@gmail.com',
              to: req.body.email,
              subject: "Your Password Generated",
              html: `
        <h2><b>Thank You for Choosing Us! Your Profile Details is Here</b></h2>
        <b>Name :</b>${req.body.name}<br />
        <b>email :</b>${req.body.email}<br />
        <b>phone :</b>${req.body.mobile}<br />
        <b>password :</b>${randPassword}<br />
        <b>Profile ID :</b>${profileId}<br />
        <small>Login with your system generated Password</small><br />
        <small>If failed to login! Please Try to reset your password!</small>
        `
            });
            res
              .status(200)
              .json({ status: true, msg: "Account Created! Check Your Email" });
          }
          main().catch(() => {
            res.status(500).json({ status: false, mag: "Email Sending Error" });
          });
        } catch (error) {
          res
            .status(500)
            .json({ msg: "Internal Server Error for Email Service" });
        }
      } else {
        res.json({ status: false, mag: "User Already Created" });
      }
    } else {
      res.json({ status: false, mag: "User Already Created" });
    }
  } catch (error) {
    res.status(500).json({ status: false, msg: "Internal Server Error" });
  }
});
router.post("/login", async (req, res) => {
  try {
    let user = await Users.findOne({ email: req.body.email });
    if (!user) {
      res.json({ status: false, msg: "User not found" });
    } else {
      const passwordCompare = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!passwordCompare)
        return res.json({ status: false, msg: "Invalid Password" });
      if (passwordCompare) {
        const payload = {
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            profileId: user.profileId,
            status: user.status
          }
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET);
        res.json({
          status: true,
          mag: "Login Successful",
          token: token,
          userStatus: user.status
        });
      }
    }
  } catch (error) {
    res.status(500).json({ status: false, msg: "Internal Server Error" });
  }
});
router.post("/changePassword", fetchUser, async (req, res) => {
  const userId = req.user.id;
  try {
    let user = await Users.findById(userId);
    if (!user) {
      res.json({ status: false, msg: "User not found" });
    } else {
      const passwordCompare = await bcrypt.compare(
        req.body.oldPassword,
        user.password
      );
      if (!passwordCompare)
        return res.json({ status: false, msg: "Invalid Password" });
      if (passwordCompare) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        user = await Users.findByIdAndUpdate(
          { _id: userId },
          { status: true, password: hashedPassword }
        );

        res.json({
          status: true,
          mag: "Password Changed",
          user
        });
      }
    }
  } catch (error) {
    res
      .status(500)
      .json({ status: false, msg: "Internal Server Error", error });
  }
});
router.post("/skipChangePassword", fetchUser, async (req, res) => {
  const userId = req.user.id;
  try {
    let user = await Users.findById(userId);
    if (!user) {
      res.json({ status: false, msg: "User not found" });
    } else {
      user = await Users.findByIdAndUpdate({ _id: userId }, { status: true });
      res.json({ status: true, msg: "Password Change Skipped", user });
    }
  } catch (error) {
    res
      .status(500)
      .json({ status: false, msg: "Internal Server Error", error });
  }
});
router.post("/addAddress", fetchUser, async (req, res) => {
  const userId = req.user.id;
  try {
    let user = await Users.findById(userId);
    if (!user) {
      res.json({ status: false, msg: "User not found" });
    } else {
      const pinCode = req.body.pinCode.slice(0, 6);
      let address = await Address.findOne({ addressId: req.body.addressId });
      if (!address) {
        address = await Address.create({
          addressLineOne: req.body.addressLineOne,
          landMark: req.body.landMark,
          town: req.body.town,
          area: req.body.area,
          postOffice: req.body.postOffice,
          pin: pinCode,
          addressId: req.body.addressId
        });
        user = await Users.findByIdAndUpdate(
          { _id: userId },
          { addressAdded: true }
        );
        res.json({ status: true, msg: "Address Added" });
      } else {
        res.json({ status: true, msg: "Address Already Added" });
      }
    }
  } catch (error) {
    res
      .status(500)
      .json({ status: false, msg: "Internal Server Error", error });
  }
});
router.post("/resetPassword", async (req, res) => {
  try {
    let user = await Users.findOne({ email: req.body.email });
    if (!user) {
      res.json({ status: false, msg: "User not found" });
    } else {
      const randPassword = (Math.random() + 1)
        .toString(36)
        .substring(3)
        .toUpperCase();
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(randPassword, salt);
      user = await Users.findByIdAndUpdate(
        { _id: user._id },
        { status: false, password: hashedPassword }
      );
      try {
        const transporter = nodemailer.createTransport({
          host: "smtp.forwardemail.net",
          port: 465,
          secure: true,
          service: "gmail",
          auth: {
            user: process.env.MAILER_USERID,
            pass: process.env.MAILER_PASSWORD
          }
        });
        async function main() {
          const info = await transporter.sendMail({
            from: '"Server Mail"anowarulah07@gmail.com',
            to: req.body.email,
            subject: "Your Password Re-Generated",
            html: `
        <h2><b>Happy to Serve you! your new re-generated password is:</b></h2>
        <b>password :</b>${randPassword}<br />
        <small>Login with your system generated Password</small><br />
        <small>If failed to login! Please Try to reset your password!</small>
        `
          });
          res
            .status(200)
            .json({ status: true, msg: "Successful! Check Your Email" });
        }
        main().catch(() => {
          res
            .status(500)
            .json({ status: false, mag: "Please Try After Some Time" });
        });
      } catch (error) {
        res
          .status(500)
          .json({ msg: "Internal Server Error for Email Service" });
      }
    }
  } catch (error) {
    res
      .status(500)
      .json({ status: false, msg: "Internal Server Error", error });
  }
});

module.exports = router;
