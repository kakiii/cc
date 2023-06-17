import json

with open("2.json") as f:
    data = json.load(f)
    new_data= [_ for _ in data.items()]
    for k,v in data.items():
        index = int(k)
        new_data[index] = v
        if not v['ending']:
            v['option']['A']['goto'] = int(v['option']['A']['goto'])
            v['option']['B']['goto'] = int(v['option']['B']['goto'])
        else:

    # save to new file
   
        

    


