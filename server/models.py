from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from datetime import datetime

metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

db = SQLAlchemy(metadata=metadata)


class Employee(db.Model,SerializerMixin):
    __tablename__ = "employees"

    id = db.Column(db.Integer, primary_key=True)
    name= db.Column(db.String)
    department=db.Column(db.String)
    role=db.Column(db.String)

    # relationship between employee and toolrecords
    # An employee can appear on many times toolrecords, depending on the tools he/she taken
    tool_records = db.relationship('ToolRecords', back_populates='employee')

    serialize_rules=('-toolrecords.employee',)

    def __repr__(self):
        return f"<Employee id: {self.id}, " +\
            f"Name: {self.name}, " +\
            f"Department: {self.department}, " +\
            f"Role: {self.role} >"
    
    @validates('name')
    def validate_name(self, key, name):
        if not name:
            raise ValueError('Name field required')
        return name

    

class StoreEmployee(db.Model, SerializerMixin):
    __tablename__ ="store_employees"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    role = db.Column(db.String)

    # Relationship between store_employees and tool_records
    # a store employee will also appear many times depending how many to tools he/she has assigned on the tool records
    tool_records = db.relationship('ToolRecords', back_populates='store_employee')

    serialize_rules=('-toolrecords.store_employee',)

    def __repr__(self):
        return f"<Store Employee id: {self.id}, " +\
            f"Name: {self.name}, " +\
            f"Role: {self.role} >"
    
    @validates('name')
    def validate_name(self, key, name):
        if not name:
            raise ValueError('Name field required')
        return name



class Tools(db.Model, SerializerMixin):
    __tablename__ = "tools"

    id = db.Column(db.Integer,primary_key=True)
    name = db.Column(db.String)
    brand = db.Column(db.String)
    purchase_date= db.Column(db.DateTime, default = datetime.utcnow)
    no_of_tools = db.Column(db.Integer)
    image = db.Column(db.String)

    # Relationship between tool and tool_records
    # can have many tools recorded in the toolrecords table
    tool_records = db.relationship('ToolRecords', back_populates='tool')

    serialize_rules=('-toolrecords.tools',)
   
    def __repr__(self):
        return f"<Tools id: {self.id}, " +\
            f"Name: {self.name}, " +\
            f"Brand: {self.brand}, " +\
            f"Date Bought: {self.purchase_date}, " +\
            f"No. of Tools: {self.no_of_tools} >"
    

    @validates('name')
    def validate_name(self, key, name):
        if not name:
            raise ValueError('Name field required')
        return name
    
    @validates('no_of_tools')
    def validate_no_of_tools(self, key, value):
        if value <= 0:
            raise ValueError("Number of tools must be positive.")
        return value
    
    

    
class ToolRecords(db.Model,SerializerMixin):
    __tablename__ = "toolrecords"

    id = db.Column(db.Integer,primary_key=True)
    date_taken = db.Column(db.DateTime, default= datetime.utcnow)
    date_returned = db.Column(db.String, nullable=True)

    # foreign keys
    tool_id = db.Column(db.Integer, db.ForeignKey('tools.id'))
    employee_id = db.Column(db.Integer, db.ForeignKey('employees.id'))
    store_employee_id= db.Column(db.Integer, db.ForeignKey('store_employees.id'))

    # relationships
    tool = db.relationship('Tools', back_populates='tool_records')
    employee = db.relationship('Employee', back_populates='tool_records')
    store_employee = db.relationship('StoreEmployee', back_populates='tool_records')

    serialize_rules=('-employee.toolrecords','-store_employee.toolrecords','-tool.toolrecords',)


    def __repr__(self):
        return f"<Tool record id: {self.id}. {self.employee.name} has taken {self.tool.name} " +\
             f"at {self.date_taken}. The tool was returned on {self.date_returned}" +\
             f". {self.store_employee.name} was in charge>"
    