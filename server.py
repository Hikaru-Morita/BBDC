from flask import Flask, render_template, request, jsonify
import csv, random

app = Flask(__name__)

# python で static変数を使いたかった
# 代用案
class static:
    taskID=0
    task_num=0

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
    }
    static.taskID+=1
    return jsonify(info)

# /user で user.js により呼び出される 
@app.route('/complete-task', methods=['POST'])
def complete():
    if(request.form['result']):
        static.task_num += 1
        print(static.task_num)

    if(static.task_num>=10):
        return 'false'
    else:
        return 'true'

# @app.route('/mogumogu', methods=[])
# def complete():
#     return 'go'

if __name__ == "__main__":
    app.run(threaded=True, debug=True, host='0.0.0.0', port=5000)
