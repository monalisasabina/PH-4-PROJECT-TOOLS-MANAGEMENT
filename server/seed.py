from app import app
from models import db, Employee,StoreEmployee,Tools,ToolRecords
from datetime import datetime

with app.app_context():

    print('Tools Management system')

     # Delete all the rows in tables
    print('\nClearing database...')
    Employee.query.delete()
    StoreEmployee.query.delete()
    Tools.query.delete()
    ToolRecords.query.delete()

    print('Adding Employees...')
    employees = [
        Employee(name='Monalisa Onyango', department='Electrical',role='Engineer'),
        Employee(name='Sharon Odhiambo', department ='Electrical', role='Engineer'),
        Employee(name = 'Daniel Kamau', department='Electrical', role ='Technician'),
        Employee(name='Joshua Caleb', department='Mechanical',role='Chief Welder'),
        Employee(name='Simon Washington', department='Mechanical',role='Engineer')
    ]
    db.session.add_all(employees)
    db.session.commit()

    print('Adding Store Employees...')
    store_employees = [
        StoreEmployee(name="Fauz Mohammed",role="Store Manager"),
        StoreEmployee(name="Ruth Ng'ang'a", role="Store Clerk"),
        StoreEmployee(name="Jennifer Mumo", role="Store Clerk"),
        StoreEmployee(name="Elizabeth Kipkorir", role="Intern"),
        StoreEmployee(name="Jane Ouma", role="Intern")
    ]
    db.session.add_all(store_employees)
    db.session.commit()

    print('Adding tools...')
    tools = [
        Tools(name='Hammer', brand='Stanley', purchase_date=datetime(2023, 7, 5), no_of_tools=10, image='https://microless.com/cdn/products/19dca030b9eed0fad51273735c1e3b4b-hi.jpg', available_tools=6),
        Tools(name='Drill', brand='Bosch', purchase_date=datetime(2022, 9, 18), no_of_tools=5, image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_Egdtg1RYebkDtTfdtZVHrv3XWbvziudS8Q&s', available_tools=3),
        Tools(name='Wrench', brand='DeWalt', purchase_date=datetime(2023, 5, 12), no_of_tools=8, image='https://images.thdstatic.com/productImages/f7b54a27-4f6a-4baa-a742-fa321d44da0c/svn/dewalt-ratcheting-wrenches-dwht75497-64_1000.jpg',available_tools=5)
    ]
    db.session.add_all(tools)
    db.session.commit()

    print('Adding tool records...')
    tool_records = [
        ToolRecords(date_returned=None, tool_id= 3, employee_id=5, store_employee_id=5),
        ToolRecords(date_returned= '2024-09-21', tool_id=1,employee_id=1,store_employee_id=1)
    ]
    db.session.add_all(tool_records)
    db.session.commit()

    print('\nTESTING')
    print('Getting all employees')
    employees_list= Employee.query.all()
    print(employees_list)

    print('\nGetting all store employees')
    store_employees_list= StoreEmployee.query.all()
    print(store_employees_list)

    print('\nGetting all tools')
    tools_list=Tools.query.all()
    print(tools_list)

    print('\nGetting all toolrecords')
    tool_records_list=ToolRecords.query.all()
    print(tool_records_list)

    print('\n..............Seeding complete!...............')



