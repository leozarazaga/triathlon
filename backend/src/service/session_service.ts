/**
	session services
*/

import { prisma } from "../prisma"


/**
	 get all sessions 
*/
 export const getSessions = () => {
    return prisma.session.findMany()
 }



/**
	 get  session by id
*/

