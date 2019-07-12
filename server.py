from flask import Flask, render_template, request, jsonify
import csv, random

app = Flask(__name__)

# python で static変数を使いたかった
# 代用案
class static:
    taskID=1

@app.route('/')
def index():
    return "route"

@app.route('/user')
def cliant():
    return render_template('user.html')

@app.route('/make-task')
def make():
    target = random.randint(50000,100000)
    info = {
        "target": target,
        "taskID": static.taskID,
        "result": "0"          # 空の場合 0
    }
    static.taskID+=1

    #csvモジュールは独自の改行処理を行うため、newline='' を指定
    with open('taskID_list.csv','a',newline='') as csvfile:
        print(info["target"],file=csvfile,end=',')
        print(info["taskID"],file=csvfile,end=',')
        print(info["result"],file=csvfile)
    return jsonify(info)

# /user で user.js により呼び出される 
@app.route('/complete-task', methods=['POST'])
def complete():
    print(1)
    with open('taskID_list.csv', 'r+', newline='') as csvfile:
        reader=csv.reader(csvfile, lineterminator='\n')
        for i in reader:
            print(i)                
    print('taskID:' + request.form['taskID'])
    print('result:' + request.form['result'])
    return 'ok from server'

# @app.route('/mogumogu', methods=[])
# def complete():
#     return 'go'

if __name__ == "__main__":
    app.run(threaded=True, debug=True, host='0.0.0.0', port=5000)
