

select * from [user]
   join [chatgroup] on [chatgroup].[userid] = [user].[id]
   join [chat] on [chat].[id] = [chatgroup].[chatid]
    where [user].[id] = 1 -- < replace user id with actual user id
	  