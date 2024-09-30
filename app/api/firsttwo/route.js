import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";


export async function POST(request){
    const {problemtype} = await request.json()
    const {cookies} = request

    
    const teamName = cookies.get('teamname').value




    try{
        const client = await clientPromise;
        const db = client.db('naboj'); // Replace with your database name
        const usersCollection = db.collection('teams');
        const problems = db.collection(problemtype)
        const user = await usersCollection.findOne({ teamName });

        if (!user) {
            return NextResponse.json({ message: 'Invalid teamName.' }, { status: 401 });
          }
        console.log(problemtype)
        if (problemtype=='math-tasks'){
            var nonsolved = await user.nevyriesenemat
        }

        if (problemtype=='puzzles'){
            var nonsolved = await user.nevyrieseneboje
        }

        if (problemtype=='logic-tasks'){
            var nonsolved = await user.nevyriesenelamy
        }

        const firsttwo = nonsolved.slice(0, 2)


        // console.log(firsttwo[0])

        const problem1 = await problems.find({id: firsttwo[0]}).toArray()
        const problem2 = await problems.find({id: firsttwo[1]}).toArray()
        // console.log(problem1)

        const finalproblems = [problem1, problem2]
    

        


        return NextResponse.json(finalproblems)




    }
    catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
      }
}