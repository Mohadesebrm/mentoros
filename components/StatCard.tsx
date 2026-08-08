export default function StatCard(props) {
    return (
        <div className="border p-4 rounded-lg shadow-md">
            <h1>{props.title}</h1>
            <p className="text=2xl font-bold">
            {props.value}
            </p>
        </div>
    );
}
