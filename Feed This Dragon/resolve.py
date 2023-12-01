import requests
import threading
import time

url = "https://feedthisdragon.chall.malicecyber.com/api/v1"
cookie = "064848b7-e089-4a10-8fd4-09bb42d48d56"
import sys

class DevNull:
    def write(self, msg):
        pass

sys.stderr = DevNull()


def get_req(cookie,update = False):
    headers = {
        "Host": "feedthisdragon.chall.malicecyber.com",
        "Referer": "https://feedthisdragon.chall.malicecyber.com/",
        "Authorization": "mynotsosecrettoken",
        "Session": cookie,
        "Update": str(update).lower(),
        "Content-Type": "application/json",
        "Origin": "https://feedthisdragon.chall.malicecyber.com",
        "Cookie": "uuid="+cookie,
    }
    temps1 = time.time()
    req = requests.get(url, headers=headers).json()
    temps2 = time.time()
    print(temps2-temps1)
    items = req["items"]
    achievements = req["achievements"]
    player_info = {"level" : req["level"] ,"max_health" : req["max_health"], "bag" :  req["bag"], "coin" : req["coin"], "health" : req["health"], "hunger" : req["hunger"]}
    upgrades = req["upgrades"]
    return(items,player_info,achievements,upgrades)


def post_req(cookie,items,update = False):

    headers = {
        "Host": "feedthisdragon.chall.malicecyber.com",
        "Referer": "https://feedthisdragon.chall.malicecyber.com/",
        "Authorization": "mynotsosecrettoken",
        "Session": cookie,
        "Update": str(update).lower(),
        "ItemUuid": items,
        "Origin": "https://feedthisdragon.chall.malicecyber.com",
        "Cookie": "uuid="+cookie,
    }
    try:
        req = requests.post(url, headers=headers,timeout=0.1)
    except requests.exceptions.ReadTimeout: 
        pass
    return(1)



def get_non_trap_items(items):
    non_trap_items = [item for item in items if (item['type'] != 'trap' and item['type'] != 'fox')]
    return(non_trap_items)

def buy_items(cookie,items):

    headers = {
        "Host": "feedthisdragon.chall.malicecyber.com",
        "Referer": "https://feedthisdragon.chall.malicecyber.com/",
        "Authorization": "mynotsosecrettoken",
        "Session": cookie,
        "ShopUuid": items,
        "Cookie": "uuid="+cookie,
    }

    req = requests.post(url, headers=headers).json()
    items = req["items"]
    achievements = req["achievements"]
    player_info = {"level" : req["level"] ,"max_health" : req["max_health"], "bag" :  req["bag"], "coin" : req["coin"], "health" : req["health"], "hunger" : req["hunger"]}
    return(items,player_info,achievements)


def click_on_all_items(state):
    threads = []
    items =state[0]
    #print(items)
    non_trap_items = get_non_trap_items(items)
    for item in non_trap_items:
        uuid = item["uuid"]
        flag = False
        thread = threading.Thread(target=post_req, args=(cookie, uuid, flag))
        threads.append(thread)
        thread.start()
        #(post_req(cookie,uuid,False)[1])
    for thread in threads:
        thread.join()



def auto_upgrades(state):
    upgrades = state[3]
    #upgrades.pop(3)
    coin = state[1]["coin"]
    element_min = min(upgrades, key=lambda x: x['cost'])
    cout_minimum = element_min['cost']
    uuid_associé = element_min['uuid']
    if cout_minimum < coin:
        buy_items(cookie,uuid_associé)
    return 1




def play(iteration):
    for i in range(iteration):
        print("Jeu en cours : ", (i/iteration * 100), " %")
        state = (get_req(cookie,True))
        print("Get requests done")
        print(state[1])
        click_on_all_items(state)
        print("Clicked on all items done")
        auto_upgrades(state)
        print("upgrades done")


for i in range(11):
    play(10)

