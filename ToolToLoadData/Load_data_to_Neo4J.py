import openpyxl as px
import argparse
import collections

parser = argparse.ArgumentParser(description='Parser')

parser.add_argument('-wb', action="store", dest="workbook_name", default="SER517_data.xlsx")
parser.add_argument('-st', action="store", dest="sheet_name", default="Graphics")

args = parser.parse_args()

W = px.load_workbook(args.workbook_name)
p = W.get_sheet_by_name(name = args.sheet_name)

reference_relation = collections.OrderedDict()
column_titles_list = [];
total_content = []
first_row = True;

for rows in p.iter_rows():    
    current_row = []
    
    if first_row == True:        
        for col in rows:
            column_titles_list.append(str(col.value))            
        first_row = False        
    else:        
        for col in rows:
            current_row.append(str(col.value))            
        total_content.append(current_row)
 

with open ('config.txt', 'w') as file:
    for line in total_content:        
        line_id = str(int(line[0]) + 50)
        title = line[1]
        author = line[2]
        domain = line[3]
        
        if line[4] in (None, "", 'None'):
            referrers = line[4]
        else:
            referrers = line[4].split(",")
                        
        link = line[5]
        
        row =  "CREATE (Paper"+ line_id +":ResearchPaper {Title:'" + title + "', Author: '" + author + "', Domain: '" + domain + "', Link: '" + link + "'}) \n"

        try:
            file.write(row)
        except:
            print (" Row "+ line_id + " not written")
            
        if referrers not in (None, "", 'None'):
            for referrer in referrers:                
                referrer = str(int(referrer) + 50)
                
                if referrer in reference_relation:                               
                    reference_relation[referrer].append(line_id)                
                else:
                    reference_relation[referrer] = [line_id]


with open ('config.txt', 'a') as file2:
    
    file2.write("\n")
    file2.write("CREATE")
    file2.write("\n")

    key_index = 1
    
    for referrer in reference_relation:        
        referees = reference_relation[referrer]
        
        if (key_index == len(reference_relation)):            
            val_index = 0
            
            for referee in referees:
                if (referee == referees[-1]):                    
                    row = "(Paper"+ referrer +")-[:HAS_REFERRED]->(Paper"+ referee +");\n"           
                    try:
                        file2.write(row)
                    except:
                        print ("error on line: "+ referee)
                else:
                    row = "(Paper"+ referrer +")-[:HAS_REFERRED]->(Paper"+ referee +"),\n"           
                    try:
                        file2.write(row)
                    except:
                        print ("error on line: "+ referee)
                val_index += 1
                    
        else:            
            for referee in referees:                
                row = "(Paper"+ referrer +")-[:HAS_REFERRED]->(Paper"+ referee +"),\n"                
                try:
                    file2.write(row)
                except:
                    print ("error on line: "+ referee)                    
        key_index += 1
