from flask import Flask, render_template, redirect, url_for, flash
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField
from wtforms.validators import DataRequired, Length
from werkzeug.security import generate_password_hash, check_password_hash
from flask_bcrypt import Bcrypt

import os
import secrets
secret_key = secrets.token_hex(16)  # Generate a 16-byte (32-character) secret key
 
app = Flask(__name__)
app.config['SECRET_KEY'] = secret_key  # Replace with your own secret key

# setup database
db_path = os.path.join(os.path.dirname(__file__), 'site.db')
app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{db_path}'  # Use SQLite for simplicity
db = SQLAlchemy(app)

# security for password hashing
bcrypt = Bcrypt(app)

login_manager = LoginManager(app)
login_manager.login_view = 'login'

# setup csrf protection
from flask_wtf.csrf import CSRFProtect
csrf = CSRFProtect(app)

class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    high_score = db.Column(db.Integer, nullable=False, default=0)

class Game(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    score = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))


# Define the registration and login forms (WTForms)
class RegistrationForm(FlaskForm):
    username = StringField('Username', validators=[DataRequired(), Length(min=4, max=80)])
    password = PasswordField('Password', validators=[DataRequired(), Length(min=6)])
    submit = SubmitField('Register')

class LoginForm(FlaskForm):
    username = StringField('Username', validators=[DataRequired()])
    password = PasswordField('Password', validators=[DataRequired()])
    submit = SubmitField('Login')

# Define the routes for the app
@app.route('/')
def home():
    return 'Welcome to the Flask Authentication App'

@app.route('/register', methods=['GET', 'POST'])
def register():
    form = RegistrationForm()
    if form.validate_on_submit():
        username = form.username.data
        password = form.password.data
        existing_user = User.query.filter_by(username=username).first()
        if existing_user:
            flash('Username is already taken.', 'danger')
        else:
            hashed_password = generate_password_hash(password, method='sha256')
            new_user = User(username=username, password=hashed_password)
            db.session.add(new_user)
            db.session.commit()

            flash('Registration successful!', 'success')
            return redirect(url_for('login'))
    return render_template('register.html', form=form)

@app.route('/login', methods=['GET', 'POST'])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        username = form.username.data
        password = form.password.data
        user = User.query.filter_by(username=username).first()
        if user and check_password_hash(user.password, password):
            login_user(user)
            flash('Login successful!', 'success')
            return redirect(url_for('game'))
        else:
            flash('Login failed. Check your username and password.', 'danger')
    return render_template('login.html', form=form)

@app.route('/game')
@login_required
def game():
    return render_template('index.html')

@app.route('/profile')
@login_required
def profile():
    return f'Welcome to your profile, {current_user.username}!'

@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('home'))


from flask import Flask, request, jsonify

@app.route('/update_score', methods=['POST'])
def update_score():
    # Extract data from the AJAX request
    data = request.json
    new_score = data.get('score')

    # Update the user's score in the database (replace this with your actual database update code)
    # For example, if you are using SQLAlchemy:
    
    user = User.query.filter_by(id=data.get('user_id')).first()
    if user.high_score < new_score:
        user.high_score = new_score
        db.session.commit()

    # new entry on Game table
    game = Game(score=new_score, user_id=data.get('user_id'))
    db.session.add(game)
    db.session.commit()

    # For demonstration purposes, assume the update was successful
    success = True

    # Return a response indicating success or failure
    response_data = {'success': success}
    return jsonify(response_data)
if __name__ == '__main__':
    app.run(debug=True)