// NOT violating the Single Responsibility Principle
class User {
    public email: string;
    public password: string;
    public role: string;

    login(email: string, password: string) {}

    signup(email: string, password: string) {}

    assignRole(role: string) {}
}

// Violating the Single Responsibility Principle
class ReportDocument {
    public data: any;
    public report: any;

    generateReport(data: any) {} // Violation due to the generateReport and createPDF methods being too different

    createPDF(report: any) {} // Violation due to the generateReport and createPDF methods being too different
}
