#!/usr/bin/env python 3

from flask import Flask,request, make_response
from flask_migrate import Migrate
from flask_restful import Api, Resource
from models import db, Employee, StoreEmployee, Tools, ToolRecords, User, bcrypt
from flask_login import LoginManager, login_user, logout_user, login_required
from flask_cors import CORS


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'your_secret_key'
app.json.compact = False

CORS(app)

migrate = Migrate(app, db)
db.init_app(app)
bcrypt.init_app(app)
login_manager = LoginManager(app)
login_manager.login_view = 'login'


api = Api(app)

# Home page
class Home(Resource):
     
     def get(self):
          
          return {
               "message": " 🌃 Welcome to the Engineering Store API 🌃"
          },200

api.add_resource(Home, '/')

# USER REGISTRATION
class Register(Resource):
    def post(self):
        data = request.get_json()

        username = data.get('username')
        password = data.get('password')

        if not username or not password:
            return make_response({"error": "Username and password are required"}, 400)

        # Check if the username already exists
        user = User.query.filter_by(username=username).first()
        if user:
            return make_response({"error": "User already exists"}, 400)

        # Hash the password and create the new user
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
        new_user = User(username=username, password_hash=hashed_password)

        try:
            db.session.add(new_user)
            db.session.commit()
            return make_response({"message": "User registered successfully"}, 201)
        except:
            db.session.rollback()
            return make_response({"error": "Error registering user"}, 500)

api.add_resource(Register, '/register')


# USER LOGIN
class Login(Resource):
    def post(self):
        data = request.get_json()

        username = data.get('username')
        password = data.get('password')

        if not username or not password:
            return make_response({"error": "Username and password are required"}, 400)

        # Find the user in the database
        user = User.query.filter_by(username=username).first()

        if user and bcrypt.check_password_hash(user.password_hash, password):
            # Log the user in
            login_user(user)
            return make_response({"message": f"Welcome back, {user.username}!"}, 200)
        else:
            return make_response({"error": "Invalid credentials"}, 401)

api.add_resource(Login, '/login')

# USER LOGOUT
class Logout(Resource):
    @login_required
    def post(self):
        logout_user()
        return make_response({"message": "Successfully logged out"}, 200)

api.add_resource(Logout, '/logout')

# Load the user from the database for Flask-Login
@login_manager.user_loader
def load_user(user_id):
    return User.query.get(user_id)


# EMPLOYEES CRUD...........................................................
class Employees(Resource):
     
     def get(self):
          employees_list=[]
          for employee in Employee.query.all():
               employee_dict = {
                    "name":employee.name,
                    "role":employee.role,
                    "department":employee.department
               }
               employees_list.append(employee_dict)

          return make_response(employees_list,200)
     
     def post(self):
          
          try:
              data = request.get_json()

              new_employee = Employee(
                   name= data['name'],
                   role=data['role'],
                   department=data['department']
               )
              
              db.session.add(new_employee)
              db.session.commit()

              return make_response(
                   new_employee.to_dict(),201
              )
          except:    
               make_response({"errors": ["validation errors"]},403)
     
api.add_resource(Employees, '/employees')

class EmployeeById(Resource):
     
     def get(self,id):
           
           employee =Employee.query.filter(Employee.id == id).first()

           if employee:
                
                return make_response(employee.to_dict(),200)
           
           return make_response({"error":"Employee not found"},404)


     def patch(self,id):

         employee =Employee.query.filter(Employee.id == id).first()

         data = request.get_json()
          
         if employee:

              try:
                   for attr in data:
                        setattr(employee, attr, data[attr])

                        db.session.add(employee)
                        db.session.commit()

                        employee_dict ={
                             "name":employee.name,
                             "role":employee.role,
                             "department":employee.department
                        }

                        response = make_response(
                             employee_dict,200
                        )
                        return response
                   
              except ValueError:      
                   return make_response({"errors": ["validation errors"]}, 400)
     
     def delete(self,id):
          
          employee =Employee.query.filter(Employee.id == id).first()

          db.session.delete(employee)
          db.session.commit()

          response_dict = {"Message": "Employee successfully deleted"}

          return make_response(response_dict,200)
          
api.add_resource(EmployeeById,'/employees/<int:id>')     
               


# STORE EMPLOYEES CRUD......................................................

class StoreEmployees(Resource):
     
    def get(self):
          store_employees_list=[]
          for store_employee in StoreEmployee.query.all():
               store_employee_dict = {
                    "name":store_employee.name,
                    "role":store_employee.role,
               }
               store_employees_list.append(store_employee_dict)

          return make_response(store_employees_list,200)
     
    def post(self):
          
          try:
              data = request.get_json()

              new_store_employee = StoreEmployee(
                   name= data['name'],
                   role=data['role'],
               )
              
              db.session.add(new_store_employee)
              db.session.commit()

              return make_response(
                   new_store_employee.to_dict(),201
              )
          except:    
               make_response({"errors": ["validation errors"]},403)
     
api.add_resource(StoreEmployees, '/storeemployees')     
     

class StoreEmployeesById(Resource):
     
     def get(self,id):
           
           store_employee =StoreEmployee.query.filter(StoreEmployee.id == id).first()

           if store_employee:
                
                return make_response(store_employee.to_dict(),200)
           
           return make_response({"error":"Store employee not found"},404)


     def patch(self,id):

         store_employee =StoreEmployee.query.filter(StoreEmployee.id == id).first()

         data = request.get_json()
          
         if store_employee:

              try:
                   for attr in data:
                        setattr(store_employee, attr, data[attr])

                        db.session.add(store_employee)
                        db.session.commit()

                        store_employee_dict ={
                             "name":store_employee.name,
                             "role":store_employee.role
                        }

                        response = make_response(
                             store_employee_dict,200
                        )
                        return response
                   
              except ValueError:      
                   return make_response({"errors": ["validation errors"]}, 400)
     
     def delete(self,id):
          
          store_employee =StoreEmployee.query.filter(StoreEmployee.id == id).first()

          db.session.delete(store_employee)
          db.session.commit()

          response_dict = {"Message": "Store Employee successfully deleted"}

          return make_response(response_dict,200)

     
api.add_resource(StoreEmployeesById, '/storeemployees/<int:id>')     

# TOOLS CRUD.................................................................
class Tools1(Resource):
     
    def get(self):
          tools_list=[]
          for tool in Tools.query.all():
               tool_dict = {
                    "name":tool.name,
                    "brand":tool.brand,
                    "no_of_tools":tool.no_of_tools,
                    "image":tool.image,
                    "purchase_date":tool.purchase_date,
                    "available_tools":tool.available_tools
               }
               tools_list.append(tool_dict)

          return make_response(tools_list,200)
     
    def post(self):
          
          try:
              data = request.get_json()

              new_tool= Tools(
                   name= data['name'],
                   brand=data['brand'],
                   no_of_tools=data['no_of_tools'],
                   image=data['image'],
                   available_tools=data['available_tools']
               )
              
              db.session.add(new_tool)
              db.session.commit()

              return make_response(
                   new_tool.to_dict(),201
              )
          except:    
               make_response({"errors": ["validation errors"]},403)
          
api.add_resource(Tools1, '/tools')

class ToolsById(Resource):
      
    def get(self,id):
           
           tool =Tools.query.filter(Tools.id == id).first()

           if tool:
                
                return make_response(tool.to_dict(),200)
           
           return make_response({"error":"Tool not found"},404)


    def patch(self,id):

         tool =Tools.query.filter(Tools.id == id).first()

         data = request.get_json()
          
         if tool:

              try:
                   for attr in data:
                        setattr(tool, attr, data[attr])

                        db.session.add(tool)
                        db.session.commit()

                        tool_dict ={
                             "name":tool.name,
                             "brand":tool.brand,
                             "no_of_tools":tool.no_of_tools,
                             "available_tools":tool.available_tools,
                             "image":tool.image
                             
                        }

                        response = make_response(
                             tool_dict,200
                        )
                        return response
                   
              except ValueError:      
                   return make_response({"errors": ["validation errors"]}, 400)
     
    def delete(self,id):
          
          tool =Tools.query.filter(Tools.id == id).first()

          db.session.delete(tool)
          db.session.commit()

          response_dict = {"Message": "Tool successfully deleted"}

          return make_response(response_dict,200)
  
api.add_resource(ToolsById, '/tools/<int:id>')     


# TOOL_RECORDS CRUD.............................................................

class Records(Resource):
     
    def get(self):
          records_list=[]
          for record in ToolRecords.query.all():
               record_dict = {
                    "id":record.id,
                    "date_returned":record.date_returned,
                    "tool_id":record.tool_id,
                    "employee_id":record.employee_id,
                    "store_employee_id":record.store_employee_id,
                    # "tool":record.tool.name,
                    # "employee":record.employee.name,
                    # "store_employee":record.store_employee.name,
                    "date_taken":record.date_taken
               }
               records_list.append(record_dict)

          return make_response(records_list,200)
    
    def post(self):
          
          try:
              data = request.get_json()

              new_record= ToolRecords(
                   tool_id= data['tool_id'],
                   employee_id=data['employee_id'],
                   store_employee_id=data['store_employee_id'],
                   date_returned= data['date_returned']
               )
              
              db.session.add(new_record)
              db.session.commit()

              return make_response(
                   new_record.to_dict(),201
              )
          except:    
               make_response({"errors": ["validation errors"]},403)
          
api.add_resource(Records, '/records')


class RecordById(Resource):
     
    def get(self,id):
           
           record =ToolRecords.query.filter(ToolRecords.id == id).first()

           if record:
                
                return make_response(record.to_dict(),200)
           
           return make_response({"error":"Record not found"},404)


    def patch(self,id):

         record =ToolRecords.query.filter(ToolRecords.id == id).first()

         data = request.get_json()
          
         if record:

              try:
                   for attr in data:
                        setattr(record, attr, data[attr])

                        db.session.add(record)
                        db.session.commit()

                        record_dict ={
                             "date_returned":record.date_returned,
                             "tool_id":record.tool_id,
                             "employee_id":record.employee_id,
                             "store_employee_id":record.store_employee_id   
                        }

                        response = make_response(
                             record_dict,200
                        )
                        return response
                   
              except ValueError:      
                   return make_response({"errors": ["validation errors"]}, 400)
     
    def delete(self,id):
          
          record =ToolRecords.query.filter(ToolRecords.id == id).first()

          db.session.delete(record)
          db.session.commit()

          response_dict = {"Message": "Record successfully deleted"}

          return make_response(response_dict,200)
     
api.add_resource(RecordById, '/records/<int:id>')   

with app.app_context():
    db.create_all()
     
if __name__ == '__main__':
    app.run(port=5555, debug=True)