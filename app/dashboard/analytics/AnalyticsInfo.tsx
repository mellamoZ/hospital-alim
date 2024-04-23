"use client";
import {
  CardDescription,
  CardTitle,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import { ResponsiveBar } from "@nivo/bar";
import { ResponsiveScatterPlot } from "@nivo/scatterplot";
import { ResponsiveLine } from "@nivo/line";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import { appointment as Appointment } from "@prisma/client";
import { feedback as Feedback } from "@prisma/client";
interface AnalyticsInfoProps {
  totalUsers: number;
  totalDepartments: number;
  totalDoctors: number;
  totalWards: number;
  recentAppointments: Appointment[];
  recentFeedbacks: Feedback[];
}

const AnalyticsInfo = ({
  totalUsers,
  totalDepartments,
  totalDoctors,
  totalWards,
  recentAppointments,
  recentFeedbacks,
}: AnalyticsInfoProps) => {
  return (
    <div className="flex min-h-screen w-full">
      <div className="flex w-full flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
          <h1 className="text-lg font-semibold md:text-xl">Analytics</h1>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          <div className="grid w-full gap-4 md:grid-cols-2 xl:grid-cols-4">
            <Card>
              <CardHeader>
                <CardTitle>Users</CardTitle>
                <CardDescription>Total active users</CardDescription>
              </CardHeader>
              <CardContent>
                <h1 className="text-4xl font-bold tracking-tighter transition-all duration-500">
                  {totalUsers}
                </h1>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Departments</CardTitle>
                <CardDescription>Total departments</CardDescription>
              </CardHeader>
              <CardContent>
                <h1 className="text-4xl font-bold tracking-tighter">
                  {totalDepartments}
                </h1>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Doctors</CardTitle>
                <CardDescription>Total doctors</CardDescription>
              </CardHeader>
              <CardContent>
                <h1 className="text-4xl font-bold tracking-tighter">
                  {totalDoctors}
                </h1>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Wards</CardTitle>
                <CardDescription>Total wards</CardDescription>
              </CardHeader>
              <CardContent>
                <h1 className="text-4xl font-bold tracking-tighter">
                  {totalWards}
                </h1>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Card className="flex flex-col">
              <CardHeader>
                <CardDescription>Total Patients</CardDescription>
                <CardTitle>238</CardTitle>
              </CardHeader>
              <CardContent>
                <StackedbarChart className="aspect-[4/3]" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardDescription>Inpatients</CardDescription>
                <CardTitle>112</CardTitle>
              </CardHeader>
              <CardContent>
                <DotChart className="aspect-[4/3]" />
              </CardContent>
            </Card>
            <Card className="flex flex-col">
              <CardHeader>
                <CardDescription>Visitors</CardDescription>
                <CardTitle>3,456</CardTitle>
              </CardHeader>
              <CardContent>
                <LineChart className="aspect-[4/3]" />
              </CardContent>
            </Card>
          </div>

          <div className="grid w-full gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Appointments</CardTitle>
                <CardDescription>Latest Appointments</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-24">ID</TableHead>
                      <TableHead className="min-w-28">Name</TableHead>
                      <TableHead className="hidden md:table-cell">
                        Mobile no.
                      </TableHead>
                      <TableHead className="hidden md:table-cell ">
                        Appointment date
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentAppointments.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={4}>No new appointments</TableCell>
                      </TableRow>
                    ) : (
                      recentAppointments.map((appointment) => (
                        <TableRow key={appointment.appointment_id}>
                          <TableCell className="font-medium">
                            {appointment.appointment_id}
                          </TableCell>
                          <TableCell>{appointment.full_name}</TableCell>
                          <TableCell className="hidden max-w-40 sm:table-cell">
                            {appointment.phone_number}
                          </TableCell>
                          <TableCell>
                            {appointment.created_at instanceof Date &&
                              appointment.created_at.toLocaleDateString()}
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Recent Feedbacks</CardTitle>
                <CardDescription>Feedbacks</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Comment</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentFeedbacks.map((feedback) => (
                      <TableRow key={feedback.feedback_id}>
                        <TableCell className="font-medium">
                          {feedback.feedback_id}
                        </TableCell>
                        <TableCell>{feedback.full_name}</TableCell>
                        <TableCell className="hidden max-w-40 sm:table-cell">
                          {feedback.phone_number}
                        </TableCell>
                        <TableCell className="hidden max-w-40 sm:table-cell">
                          <p className="truncate text-ellipsis">
                            {feedback.comment}
                          </p>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

function DotChart(props: any) {
  return (
    <div {...props}>
      <ResponsiveScatterPlot
        data={[
          {
            id: "Gynecology ward",
            data: [
              { x: "Jan", y: 43 },
              { x: "Feb", y: 137 },
              { x: "Mar", y: 61 },
              { x: "Apr", y: 145 },
              { x: "May", y: 26 },
              { x: "Jun", y: 154 },
            ],
          },
          {
            id: "Oncology ward",
            data: [
              { x: "Jan", y: 60 },
              { x: "Feb", y: 48 },
              { x: "Mar", y: 177 },
              { x: "Apr", y: 78 },
              { x: "May", y: 96 },
              { x: "Jun", y: 204 },
            ],
          },
        ]}
        margin={{ top: 10, right: 10, bottom: 40, left: 40 }}
        xScale={{ type: "point" }}
        yScale={{ type: "linear" }}
        blendMode="multiply"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 0,
          tickPadding: 16,
        }}
        axisLeft={{
          tickSize: 0,
          tickValues: 5,
          tickPadding: 16,
        }}
        colors={["#2563eb", "#e11d48"]}
        useMesh={true}
        gridYValues={6}
        theme={{
          tooltip: {
            chip: {
              borderRadius: "9999px",
            },
            container: {
              fontSize: "12px",
              textTransform: "capitalize",
              borderRadius: "6px",
            },
          },
          grid: {
            line: {
              stroke: "#f3f4f6",
            },
          },
        }}
        role="application"
      />
    </div>
  );
}

function LineChart(props: any) {
  return (
    <div {...props}>
      <ResponsiveLine
        data={[
          {
            id: "Departments",
            data: [
              { x: "Jan", y: 43 },
              { x: "Feb", y: 137 },
              { x: "Mar", y: 61 },
              { x: "Apr", y: 145 },
              { x: "May", y: 26 },
              { x: "Jun", y: 154 },
            ],
          },
          {
            id: "Mobile",
            data: [
              { x: "Jan", y: 60 },
              { x: "Feb", y: 48 },
              { x: "Mar", y: 177 },
              { x: "Apr", y: 78 },
              { x: "May", y: 96 },
              { x: "Jun", y: 204 },
            ],
          },
        ]}
        margin={{ top: 10, right: 10, bottom: 40, left: 40 }}
        xScale={{
          type: "point",
        }}
        yScale={{
          type: "linear",
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 0,
          tickPadding: 16,
        }}
        axisLeft={{
          tickSize: 0,
          tickValues: 5,
          tickPadding: 16,
        }}
        colors={["#2563eb", "#e11d48"]}
        pointSize={6}
        useMesh={true}
        gridYValues={6}
        theme={{
          tooltip: {
            chip: {
              borderRadius: "9999px",
            },
            container: {
              fontSize: "12px",
              textTransform: "capitalize",
              borderRadius: "6px",
            },
          },
          grid: {
            line: {
              stroke: "#f3f4f6",
            },
          },
        }}
        role="application"
      />
    </div>
  );
}

function StackedbarChart(props: any) {
  return (
    <div {...props}>
      <ResponsiveBar
        data={[
          { name: "Jan", male: 111, female: 99 },
          { name: "Feb", male: 157, female: 87 },
          { name: "Mar", male: 129, female: 89 },
          { name: "Apr", male: 187, female: 151 },
          { name: "May", male: 119, female: 127 },
          { name: "Jun", male: 20, female: 121 },
        ]}
        keys={["male", "female"]}
        indexBy="name"
        margin={{ top: 0, right: 0, bottom: 40, left: 40 }}
        padding={0.3}
        colors={["#2563eb", "#e11d48"]}
        axisBottom={{
          tickSize: 0,
          tickPadding: 16,
        }}
        axisLeft={{
          tickSize: 0,
          tickValues: 4,
          tickPadding: 16,
        }}
        gridYValues={4}
        theme={{
          tooltip: {
            chip: {
              borderRadius: "9999px",
            },
            container: {
              fontSize: "12px",
              textTransform: "capitalize",
              borderRadius: "6px",
            },
          },
          grid: {
            line: {
              stroke: "#f3f4f6",
            },
          },
        }}
        tooltipLabel={({ id }) => `${id}`}
        enableLabel={false}
        role="application"
        ariaLabel="A stacked bar chart"
      />
    </div>
  );
}

export default AnalyticsInfo;
