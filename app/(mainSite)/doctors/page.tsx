import { CardContent, CardFooter, Card, CardTitle } from "@/components/ui/card";
import { getDoctorsByDepartment } from "@/lib/db/doctorCrud";
import Image from "next/image";

export default async function DoctorsPage() {
  const departmentWithDoctors = await getDoctorsByDepartment();

  const filteredData = departmentWithDoctors.filter((data) =>
    Boolean(data.doctor.length)
  );

  return (
    <div className="mt-10 flex items-center justify-center">
      <div className="flex min-h-screen w-full max-w-screen-xl flex-col items-center justify-center gap-10">
        {filteredData.map((department) => (
          <div
            className="grid gap-4 text-center"
            key={department.department_id}
          >
            <h1 className="text-3xl font-bold">{department.department_name}</h1>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {department.doctor.map((doctor) => (
                <Card key={doctor.doctor_id}>
                  <CardContent className="p-4">
                    <CardTitle className="mb-3">{doctor.doctor_name}</CardTitle>
                    <Image
                      alt="ward image"
                      src={
                        "https://dummyimage.com/600x500/5e005e/84fafa.png&text=photo"
                      }
                      className="aspect-square w-full rounded-lg object-cover shadow-sm"
                      sizes="600px"
                      height="200"
                      width="200"
                    />
                    <p className="mt-2">{doctor.specialization}</p>
                  </CardContent>
                  <CardFooter className="gap-2 border-t p-4 pt-2">
                    <div className="text-sm text-gray-800 dark:text-gray-400">
                      {doctor.description}
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
