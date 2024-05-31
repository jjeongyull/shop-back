const User = require("../models/User");
const bcrypt = require('bcryptjs');

const authController = {};
authController.loginWithEmail = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const token = await user.generateToken();
        return res.status(200).json({ status: 'success', user, token });
      } else {
        throw new Error('비밀번호가 맞지 않습니다.');
      }
    } else {
      throw new Error('이메일과 비밀번호가 맞지 않습니다.');
    }
  } catch (e) {
    return res.status(400).json({ status: 'fail', error: e.message });
  }
}


module.exports = authController;