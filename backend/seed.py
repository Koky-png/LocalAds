
from app import db
from models import User, Ad
from faker import Faker

fake = Faker()

def seed_data():
    # Create a few test users and ads
    for _ in range(5):
        user = User(name=fake.name(), email=fake.email(), password='password')
        db.session.add(user)
        db.session.commit()
        
        for _ in range(3):
            ad = Ad(title=fake.word(), description=fake.text(), price=fake.random_number(), seller_id=user.user_id)
            db.session.add(ad)
        db.session.commit()

if __name__ == "__main__":
    seed_data()
