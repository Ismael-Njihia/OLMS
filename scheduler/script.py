import psycopg2
from datetime import datetime
from dateutil import parser

#postgresql connection parameters
db_params ={
    "host"      : "localhost",
    "database"  : "olms",
    "user"      : "ismael",
    "password"  : "7507"
}
def calculate_fine(expected_return_date):
    #get the current date and time, use epoch time to compare
    current_date_time = datetime.now()
    #change current date and time to epoch time
    current_date_time = int(current_date_time.timestamp())
    print("Current date and time: ", current_date_time)
    difference = current_date_time - expected_return_date
    if difference > 0:
         print(difference, " seconds")
       #calculate the days from the difference
         days = difference / 86400
            #calculate the fine
         print(days, " days")
         fine = days * 30
         #round the fine to whole number
         fine = round(fine)
         print("Fine: ", fine)
         return fine
    else:
        fine = 0
        print(" No Fine")
        return fine
def update_fine(cursor, record):
    transation_id, expected_return_date, status = record
    expected_return_date = int(expected_return_date)
    
    fine = calculate_fine(expected_return_date)
    # update the fine in the database
    update_query = f"UPDATE public.\"transaction\" SET fine = {fine} WHERE transation_id = '{transation_id}';"
    cursor.execute(update_query)


def main():
    try:
        conn = psycopg2.connect(**db_params)
        cursor = conn.cursor()

        query = "SELECT transation_id, expected_return_date, status FROM public.\"transaction\" WHERE CAST(expected_return_date AS INTEGER) < %s;"
        current_date_time = datetime.now()
        #change current date and time to epoch time
        current_date_time = int(current_date_time.timestamp())
        cursor.execute(query, (current_date_time,))
        records = cursor.fetchall()
        #have only the records whose status is 'borrowed'
        records = [record for record in records if record[2] == 'borrowed']
        with open("records.txt","w") as file:
            file.write(f"Current run time: {datetime.now()}\n")


        for record in records:
            print("Record: ", record)
            update_fine(cursor,record)
            conn.commit()
    except Exception as e:
        print("Error connecting to database: ", e)
        return
    finally:
        cursor.close()
        conn.close()
if __name__ == "__main__":
    main()