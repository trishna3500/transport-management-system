import Navbar2 from "../components/Navbar/Navbar2";

export default function DriverInfoPage(){
    return(
        <>
        <Navbar2/>
        <table className=" w-full mt-[-40px] bg-lime-500 rounded-md px-5 py-2 text-black border border-collapse">
        <thead className=" bg-slate-400">
        <tr>
            <th className=" border border-white">Driver Name</th>
            <th className=" border border-white">Mobile Number</th>
            <th className=" border border-white">Bus Number</th>
           </tr>
        </thead>
           <tbody>
            <tr>
                <td className=" border border-white">Rejaul Haque</td>
                <td className=" border border-white">01735562782</td>
                <td className=" border border-white">1,7</td>
            </tr>
            <tr>
                <td className=" border border-white">Rashidul Islam</td>
                <td className=" border border-white">01719749687</td>
                <td className=" border border-white">2,8</td>
            </tr>
            <tr>
                <td className=" border border-white">Nur Islam</td>
                <td className=" border border-white">01796055061</td>
                <td className=" border border-white">3,9</td>
            </tr>
            <tr>
                <td className=" border border-white">Alom Mia</td>
                <td className=" border border-white">01797230909</td>
                <td className=" border border-white">4,10</td>
            </tr>
            <tr>
                <td className=" border border-white">Robiul Islam</td>
                <td className=" border border-white">01732766754</td>
                <td className=" border border-white">5,11</td>
            </tr>
            <tr>
                <td className=" border border-white">Md Azizul Hoq</td>
                <td className=" border border-white">01719204164</td>
                <td className=" border border-white">6,12</td>
            </tr>
           </tbody>
        </table>
        </>
    )
}