# Incident Details

```
curl -X POST -H "Content-Type: application/json" -H "Cache-Control: no-cache"  -d '{
   "id":"1234",
   "sys_id": "42f53c976f6f6600941148f42e3ee49e"
}
' "https://collaborationtools.azurewebsites.net/api/get-incident-details?code={{code}}"
```

```javascript

  { title: 'Customer service are not able to access external system "eeeeeee" after update',
     body: 'I wrote directly by mail to project owner Xxxx Xxxxx Yyyy, so the issue is already solved. But I\'am not able to close the incident. Xxxxx asked me to make the incident for statistic. So please close it. ',
     opened_by: { name: 'Zzzz Zzzzzz', email: 'zzzzz@nets.eu' },
     businessservice: 'DDD Dddddddddd',
     assignmentgroup: 'WWWWWW New Network' } 
```

## How it works


## Learn more

<TODO> Documentation