import json, os
from ..database import sessionLocal
from ..pv_system_module.models import PvSystemModule
from ..pv_system_inverter.models import PvSystemInverter


def seed():
    db = sessionLocal()
    basePath = os.getcwd()
    db_inverters = db.query(PvSystemInverter).first()
    db_modules = db.query(PvSystemModule).first()

    if( not db_inverters ):
         with open(f'{basePath}/app/data/seeding/inverters.json', 'r') as inverters:
            invertersData = json.load(inverters)
            for record in invertersData['records']:
                inverter = PvSystemInverter(**record)
                db.add(inverter)

            db.commit()
            db.close()

    if( not db_modules ):
         with open(f'{basePath}/app/data/seeding/modules.json', 'r') as modules:
            modulesData = json.load(modules)
            for record in modulesData['records']:
                inverter = PvSystemModule(**record)
                db.add(inverter)

            db.commit()
            db.close()
